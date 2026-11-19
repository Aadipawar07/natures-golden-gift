export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export function asyncRoute(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function formatFieldPath(path) {
  return String(path || 'request').replace(/\.(\d+)(?=\.|$)/g, '[$1]');
}

function validationReason(error) {
  if (error.kind === 'required') return 'is required';
  if (error.kind === 'enum') return 'must be a supported value';
  if (error.kind === 'regexp') {
    if (/phone$/i.test(error.path)) return 'must be a valid 10-digit Indian mobile number';
    if (/pincode$/i.test(error.path)) return 'must be a valid 6-digit Indian pincode';
    return 'has an invalid format';
  }
  if (error.kind === 'minlength') {
    return `must contain at least ${error.properties.minlength} characters`;
  }
  if (error.kind === 'maxlength') {
    return `must contain no more than ${error.properties.maxlength} characters`;
  }
  if (error.kind === 'min') return `must be at least ${error.properties.min}`;
  if (error.kind === 'max') return `must be no more than ${error.properties.max}`;
  return 'is invalid';
}

export function formatValidationError(error) {
  const fieldErrors = Object.values(error.errors || {});
  if (fieldErrors.length === 0) return 'Submitted data is invalid.';
  const details = fieldErrors.map(
    (fieldError) => `${formatFieldPath(fieldError.path)} ${validationReason(fieldError)}`
  );
  return `Invalid data: ${details.join('; ')}.`;
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  const status = error.code === 11000
    ? 409
    : error.name === 'ValidationError' || error.name === 'CastError'
      ? 400
    : Number.isInteger(error.status)
      ? error.status
      : 500;
  let message = error.message;
  if (error.code === 11000) message = 'A duplicate record already exists.';
  if (error.name === 'ValidationError') message = formatValidationError(error);
  if (error.name === 'CastError') {
    message = `Invalid ${formatFieldPath(error.path)}: expected a valid ${error.kind || 'value'}.`;
  }
  if (error.type === 'entity.parse.failed') message = 'Invalid JSON request body.';
  if (error.type === 'entity.too.large') message = 'Request body is too large.';
  if (status >= 500) {
    console.error(`${req.method} ${req.path} failed`, {
      status,
      name: error.name,
    });
  }

  res.status(status).json({
    error: status >= 500 ? 'An unexpected server error occurred.' : message,
  });
}
