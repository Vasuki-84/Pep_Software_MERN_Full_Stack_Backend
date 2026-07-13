const { HTTP_STATUS } = require('../constants');
const { sendSuccess } = require('../utils/responseHelper');
const asyncHandler = require('../helpers/asyncHandler');
const dashboardService = require('../services/dashboardService');

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard
 * @access  Public
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getDashboardStats();
  return sendSuccess(res, HTTP_STATUS.OK, 'Dashboard statistics fetched successfully', stats);
});

module.exports = {
  getDashboardStats,
};
