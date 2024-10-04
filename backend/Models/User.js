const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema definition
const UserSchema = new Schema({
    name: {
        type: String,
        required: true, // Corrected 'require' to 'required'
    },
    email: {
        type: String,
        required: true, // Corrected 'require' to 'required'
        unique: true
    },
    password: {
        type: String,
        required: true, // Corrected 'require' to 'required'
    },
});

// Mongoose Model creation
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
