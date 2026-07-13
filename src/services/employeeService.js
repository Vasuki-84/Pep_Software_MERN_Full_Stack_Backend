const Employee = require('../models/Employee');

/**
 * Get all employees with filtering, searching, sorting, and pagination
 */
const getEmployees = async (query) => {
  const { search, department, status, sortBy, page = 1, limit = 10 } = query;

  const filter = {};

  if (search) {
    filter.fullName = { $regex: search, $options: 'i' };
  }
  if (department) {
    filter.department = department;
  }
  if (status) {
    filter.status = status;
  }

  let sortCriteria = { createdAt: -1 }; // default sort
  if (sortBy === 'Latest Joining Date') {
    sortCriteria = { joiningDate: -1 };
  } else if (sortBy === 'Employee Name') {
    sortCriteria = { fullName: 1 };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const employees = await Employee.find(filter)
    .sort(sortCriteria)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Employee.countDocuments(filter);

  return {
    employees,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    },
  };
};

/**
 * Get single employee by ID
 */
const getEmployeeById = async (id) => {
  return await Employee.findById(id);
};

/**
 * Create new employee
 */
const createEmployee = async (data) => {
  return await Employee.create(data);
};

/**
 * Update employee by ID
 */
const updateEmployee = async (id, data) => {
  return await Employee.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete employee by ID
 */
const deleteEmployee = async (id) => {
  return await Employee.findByIdAndDelete(id);
};

/**
 * Check if email exists
 */
const isEmailTaken = async (email, excludeUserId = null) => {
  const employee = await Employee.findOne({ email });
  if (employee && employee._id.toString() !== excludeUserId) {
    return true;
  }
  return false;
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  isEmailTaken,
};
