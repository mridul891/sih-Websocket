import express, { response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import { createClient } from "redis";
import axios from "axios";
import { database } from "./firebase.js";
import { ref, set } from "firebase/database";
import { NewsModel } from "./db.js";
import mongoose from "mongoose";
const app = express();

const connectDb = async () => {
  try {
    console.log("Wait Connecting to the server");
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://pandeymridulwork:mridul891@sih.w13n6.mongodb.net/?retryWrites=true&w=majority&appName=sih"
    );
    console.log(
      `\n MongoDb Connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDb Connection error", error);
    process.exit(1);
  }
};

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());

io.on("connection", async (socket) => {
  console.log("user is connected ", socket.id);

  socket.on("message", async (messages) => {
    console.log(messages);

    const response = await axios.post("http://localhost:3001/analyze", {
      message: messages,
    });

    const res = await response.data;
    console.log(res);
    if (res.input_analysis.confidence.method == "not_disaster_related") {
      console.log("It is not a disaster");
    } else {
      console.log("It is an disaster");
      // add to the database
      await NewsModel.create({
        title: messages,
        location: res.input_analysis.location[0] | "unknown",
      });
    }
  });
});

app.get("/", (req, res) => {
  res.json({ message: "The  server is started" });
});

connectDb().then(() => {
  server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
  });
});
