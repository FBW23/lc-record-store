const {
  body,
  validationResult,
} = require('express-validator');

const validationRules = () => {
  return [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Your email looks funky brudamaaan'),
    body('password')
      .isLength({ min: 5 })
      .withMessage(
        'The password should be at least 5 charcaters long meow'
      ),
  ];
};

const validateUser = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const extractedErrorMessages = [];
  errors.array().map((el) => {
    extractedErrorMessages.push({ [el.param]: el.msg });
  });

  return res
    .status(422)
    .send({ errors: extractedErrorMessages });
};

module.exports = { validationRules, validateUser };
