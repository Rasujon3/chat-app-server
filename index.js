const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const { MongoClient, ServerApiVersion } = require("mongodb");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nlrhpzq.mongodb.net/?retryWrites=true&w=majority`;
// const uri = process.env.MONGO_URL2;
// console.log(uri);

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// async function run() {
//   try {
//     await client.connect();
//     console.log(`MongoDb Connected Successfully`);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

mongoose.set("strictQuery", true);
mongoose
  // .connect(process.env.MONGO_URL, {
  // .connect(process.env.MONGO_URL2, {
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  .then(() => {
    console.log("DB connection Successfully...");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("Running `Chat App` Server");
});

const server = app.listen(port, () => {
  console.log("Server Started on Port", port);
});

const io = socket(server, {
  cors: {
    origin: "https://eclectic-naiad-fb0863.netlify.app",
    Credential: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
