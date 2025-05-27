const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const verifyToken = require("../middleware/authMiddleware");

// 1. Tüm ilanları getir (herkese açık)
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find().populate("owner", "username email");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Kullanıcının ilanlarını getir (JWT gerekli)
router.get("/my", verifyToken, async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user.id });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Yeni ilan oluştur (JWT gerekli)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { bookTitle, bookImage, description } = req.body;

    const newListing = new Listing({
      bookTitle,
      bookImage,
      description,
      owner: req.user.id,
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. İlan sil (sadece sahibi)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "İlan bulunamadı" });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bu ilanı silme yetkin yok" });
    }

    await listing.remove();
    res.json({ message: "İlan silindi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. İlan güncelle (sadece sahibi güncelleyebilir)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "İlan bulunamadı" });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Bu ilanı güncelleme yetkin yok" });
    }

    const { bookTitle, bookImage, description, status } = req.body;

    if (bookTitle !== undefined) listing.bookTitle = bookTitle;
    if (bookImage !== undefined) listing.bookImage = bookImage;
    if (description !== undefined) listing.description = description;
    if (status !== undefined) listing.status = status;

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
