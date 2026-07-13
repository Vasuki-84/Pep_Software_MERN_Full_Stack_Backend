const { body } = require('express-validator');
const { DEPARTMENTS, STATUS } = require('../constants');

const employeeValidationRules = () => {
  return [
    body('fullName')
      .trim()
      .notEmpty()
      .withMessage('Full name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address'),
    body('mobileNumber')
      .trim()
      .notEmpty()
      .withMessage('Mobile number is required')
      .matches(/^\+?[1-9]\d{1,14}$/)
      .withMessage('Please provide a valid mobile number'),
    body('department')
      .trim()
      .notEmpty()
      .withMessage('Department is required')
      .isIn(DEPARTMENTS)
      .withMessage('Invalid department'),
    body('designation')
      .trim()
      .notEmpty()
      .withMessage('Designation is required')
      .isLength({ min: 2 })
      .withMessage('Designation must be at least 2 characters'),
    body('joiningDate')
      .notEmpty()
      .withMessage('Joining date is required')
      .isISO8601()
      .withMessage('Joining date must be a valid date'),
    body('status')
      .optional()
      .isIn(Object.values(STATUS))
      .withMessage('Invalid status'),
  ];
};

module.exports = {
  employeeValidationRules,
};
