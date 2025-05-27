const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");

// Kullanıcı Kaydı
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // E-posta zaten kayıtlı mı?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Bu e-posta zaten kullanılıyor." });
    }

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Kayıt başarılı." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Giriş Yap
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcı kontrolü
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "E-posta veya şifre yanlış." });
    }

    // Şifre eşleşme kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "E-posta veya şifre yanlış." });
    }

    // JWT oluştur
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Korumalı Profil Rotası
router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Profil bilgileri",
    userId: req.user.id,
  });
});

module.exports = router;
