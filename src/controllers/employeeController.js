const { HTTP_STATUS } = require('../constants');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const asyncHandler = require('../helpers/asyncHandler');
const employeeService = require('../services/employeeService');

/**
 * @desc    Get all employees
 * @route   GET /api/employees
 * @access  Public
 */
const getEmployees = asyncHandler(async (req, res) => {
  const result = await employeeService.getEmployees(req.query);
  return sendSuccess(res, HTTP_STATUS.OK, 'Employees fetched successfully', result);
});

/**
 * @desc    Get single employee
 * @route   GET /api/employees/:id
 * @access  Public
 */
const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  
  if (!employee) {
    return sendError(res, HTTP_STATUS.NOT_FOUND, 'Employee not found');
  }
  
  return sendSuccess(res, HTTP_STATUS.OK, 'Employee fetched successfully', employee);
});

/**
 * @desc    Create new employee
 * @route   POST /api/employees
 * @access  Public
 */
const createEmployee = asyncHandler(async (req, res) => {
  const isEmailTaken = await employeeService.isEmailTaken(req.body.email);
  if (isEmailTaken) {
    return sendError(res, HTTP_STATUS.CONFLICT, 'Email is already in use');
  }

  const employee = await employeeService.createEmployee(req.body);
  return sendSuccess(res, HTTP_STATUS.CREATED, 'Employee created successfully', employee);
});

/**
 * @desc    Update employee
 * @route   PUT /api/employees/:id
 * @access  Public
 */
const updateEmployee = asyncHandler(async (req, res) => {
  const existingEmployee = await employeeService.getEmployeeById(req.params.id);
  if (!existingEmployee) {
    return sendError(res, HTTP_STATUS.NOT_FOUND, 'Employee not found');
  }

  if (req.body.email) {
    const isEmailTaken = await employeeService.isEmailTaken(req.body.email, req.params.id);
    if (isEmailTaken) {
      return sendError(res, HTTP_STATUS.CONFLICT, 'Email is already in use by another employee');
    }
  }

  const employee = await employeeService.updateEmployee(req.params.id, req.body);
  return sendSuccess(res, HTTP_STATUS.OK, 'Employee updated successfully', employee);
});

/**
 * @desc    Delete employee
 * @route   DELETE /api/employees/:id
 * @access  Public
 */
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  if (!employee) {
    return sendError(res, HTTP_STATUS.NOT_FOUND, 'Employee not found');
  }

  await employeeService.deleteEmployee(req.params.id);
  return sendSuccess(res, HTTP_STATUS.OK, 'Employee deleted successfully');
});

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
