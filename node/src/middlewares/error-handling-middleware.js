export const errorHandlingMiddleware = (error, req, res, next) => {
  res.status(error.statusCode).json(error)
}
