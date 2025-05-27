const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
    },
    bookImage: {
      type: String,
      required: false, // isteğe bağlı
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["available", "pending", "exchanged"],
      default: "available",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
