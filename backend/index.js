import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname , join } from "node:path";
import {Server} from "socket.io";

const users = [];


const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("../frontend"))

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/index.html'))
  });

//  managing socket io connections

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("new-user-joined", name => {
      console.log("new user",name);
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);

    socket.on("message-send", (message , name) =>{
      socket.broadcast.emit("message-received", message, name)
    })
    } )
  });


server.listen(3000,() => {console.log("server is running at port 3000")});