const Employee = require('../models/Employee');
const { STATUS } = require('../constants');

/**
 * Get dashboard statistics
 */
const getDashboardStats = async () => {
  const [total, active, inactive] = await Promise.all([
    Employee.countDocuments(),
    Employee.countDocuments({ status: STATUS.ACTIVE }),
    Employee.countDocuments({ status: STATUS.INACTIVE }),
  ]);

  return {
    totalEmployees: total,
    activeEmployees: active,
    inactiveEmployees: inactive,
  };
};

module.exports = {
  getDashboardStats,
};
