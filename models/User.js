const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    phone: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/,
        trim: true
    },
    profileImage: {
        type: String, // Store Base64 or image URL
        default: ''
    },
    created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
