const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nlrhpzq.mongodb.net/?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// async function run() {
//   try {
//     await client.connect();
//     // console.log(`MongoDb Connected Successfully`);

//     /**
//      * Query Start
//      */

//     // const userCollection = client.db(`dbName`).collection(`collectionName`);

//     // app.get("/part/:id", async (req, res) => {
//     //     const id = req.params.id;
//     //     const query = { _id: ObjectId(id) };
//     //     const part = await partsCollection.findOne(query);
//     //     // const part = await cursor.toArray();
//     //     res.send(part);
//     //   });

//     //   app.post("/part", verifyJWT, verifyAdmin, async (req, res) => {
//     //     const part = req.body;
//     //     const result = await partsCollection.insertOne(part);
//     //     res.send(result);
//     //   });

//     //   app.delete("/part/:id", verifyJWT, verifyAdmin, async (req, res) => {
//     //     const id = req.params.id;
//     //     const filter = { _id: ObjectId(id) };
//     //     const result = await partsCollection.deleteOne(filter);
//     //     res.send(result);
//     //   });
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
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
