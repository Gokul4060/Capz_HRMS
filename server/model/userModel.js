const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminUserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

const AdminUserModel = mongoose.model('User1', adminUserSchema, "Admin");

module.exports = AdminUserModel;
