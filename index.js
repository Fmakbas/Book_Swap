const Message = require("./models/Message");
const Conversation = require("./models/Conversation");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Frontend adresinle sınırlandırılabilir
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("BookSwap backend çalışıyor!");
});

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

// Routes
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

// Socket.IO bağlantısı
io.on("connection", (socket) => {
  console.log("🔌 Yeni kullanıcı bağlandı:", socket.id);

  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`Kullanıcı ${socket.id} oda ${roomId}'ye katıldı`);
  });

  socket.on("sendMessage", async ({ roomId, senderId, text }) => {
    try {
      // 1. Mesajı MongoDB'ye kaydet
      const newMessage = new Message({
        conversation: roomId,
        sender: senderId,
        text,
      });

      const savedMessage = await newMessage.save();

      // 2. Oda içindeki kullanıcılara anlık mesaj gönder
      io.to(roomId).emit("receiveMessage", {
        _id: savedMessage._id,
        conversation: savedMessage.conversation,
        sender: senderId,
        text: savedMessage.text,
        createdAt: savedMessage.createdAt,
      });
    } catch (err) {
      console.error("💥 Mesaj kaydetme hatası:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Kullanıcı ayrıldı:", socket.id);
  });
});

// Sunucuyu başlat
server.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor (Socket.IO ile)`);
});

module.exports = app;
