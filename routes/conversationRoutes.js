const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const verifyToken = require("../middleware/authMiddleware");

// ✅ Yeni konuşma başlat
router.post("/", verifyToken, async (req, res) => {
  try {
    const { recipientId, listingId } = req.body;

    // Zaten böyle bir konuşma var mı?
    const existing = await Conversation.findOne({
      participants: { $all: [req.user.id, recipientId] },
      listing: listingId,
    });

    if (existing) {
      return res.status(200).json(existing); // Konuşma zaten varsa geri dön
    }

    // Yeni konuşma oluştur
    const conversation = new Conversation({
      participants: [req.user.id, recipientId],
      listing: listingId,
    });

    const saved = await conversation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Giriş yapan kullanıcının tüm konuşmaları
router.get("/my", verifyToken, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
    })
      .populate("listing")
      .populate("participants", "username email");

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
