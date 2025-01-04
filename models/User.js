const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // Ensure this is hashed before saving
    created_at: { type: Date, default: Date.now },
});

// Create the model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
