const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Upload and save to DB
router.post('/upload', upload.single('image'), async (req, res) => {
  const { username } = req.body;
  const imagePath = `/uploads/${req.file.filename}`;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { profileImage: imagePath },
      { new: true, upsert: true }
    );

    res.json({ success: true, profileImage: user.profileImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get user image
router.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    
    res.json({ profileImage: user?.profileImage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

module.exports = router;
