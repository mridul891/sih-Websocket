import express, { response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import { createClient } from "redis";
import axios from "axios";
const app = express();

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
    if (res.input_analysis.confidence.method == "not_disaster_related"){
      console.log("It is not a disaster")
    }else{
      console.log("It is an disaster")
    }
  });
});

app.get("/", (req, res) => {
  res.json({ message: "The fucking server is started" });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
