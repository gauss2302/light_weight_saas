/**
 * Input validation middleware factory
 * @param {Function} validator - Validation function
 * @returns {Function} Express middleware
 */
const validate = (validator) => {
  return (req, res, next) => {
    try {
      validator(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        error: {
          message: 'Validation error',
          details: error.message
        }
      });
    }
  };
};

module.exports = validate;
