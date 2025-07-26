const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const { log } = require('console');
const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
const upload = multer({ storage });

// Serve static files for uploaded images
// (Add this in your main server file, e.g., app.js)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload route
router.post('/upload', upload.single('image'), async (req, res) => {
  const { username } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const imagePath = `/uploads/${req.file.filename}`;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { profileImage: imagePath },
      { new: true, upsert: true }
    );
    res.json({ success: true, profileImage: user.profileImage });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Get user image path
router.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json({ profileImage: user?.profileImage || '' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

//get image for layout

router.get('/getprofile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json({ profileImage: user?.profileImage || '' });

  }
  catch (error) {
    console.log(error);

  }
})

module.exports = router;