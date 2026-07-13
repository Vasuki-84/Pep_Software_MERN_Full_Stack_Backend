const mongoose = require('mongoose');
const { STATUS, DEPARTMENTS } = require('../constants');

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
      index: true,
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid mobile number'],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: {
        values: DEPARTMENTS,
        message: '{VALUE} is not a valid department',
      },
      index: true,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
      minlength: [2, 'Designation must be at least 2 characters'],
    },
    joiningDate: {
      type: Date,
      required: [true, 'Joining date is required'],
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.ACTIVE,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
