const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeUserSchema = new Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const EmployeeUserModel = mongoose.model("User", employeeUserSchema, "Employees");

module.exports = EmployeeUserModel;
