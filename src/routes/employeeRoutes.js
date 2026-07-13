const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { employeeValidationRules } = require('../validators/employeeValidator');
const validate = require('../middleware/validate');

router
  .route('/')
  .get(employeeController.getEmployees)
  .post(employeeValidationRules(), validate, employeeController.createEmployee);

router
  .route('/:id')
  .get(employeeController.getEmployeeById)
  .put(employeeValidationRules(), validate, employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

module.exports = router;
