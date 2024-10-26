const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const databaseConfig = require("./configs/database");
const mainRoute = require("./routers/index.route");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

require("dotenv").config();

const app = express();
const server = createServer(app);
const io = new Server(server);

databaseConfig.connect();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("tuanemtramtinh"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.once("connection", (socket) => {
  console.log("Client connected", socket.id);
});

global._io = io;

mainRoute(app);

server.listen(3000, () => {
  console.log("App listen on port", 3000);
});
