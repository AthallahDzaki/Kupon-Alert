const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

// App setup
const PORT = 3000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Socket setup
const io = socket(server, {
    allowEIO3: true,
    cors: {
        origin: "*",
        credentials: true
    }
});
let currentKupon = 0;
io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("PushKupon", function (data) {
    if(data == 0) return;
    currentKupon = data;
    io.emit("AddKupon", currentKupon);
    console.log("Kupon Push : ", data);
  });

  socket.on("DiTerima", () => {
    if(currentKupon == 0) return;
    currentKupon = 0;
    io.emit("KuponDiTerima", currentKupon);
  });

  socket.on("Hangus", () => {
    if(currentKupon == 0) return;
    currentKupon = 0;
    io.emit("KuponHangus", currentKupon);
  });
});