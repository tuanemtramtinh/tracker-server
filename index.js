const express = require("express");
const bodyParser = require("body-parser");
const databaseConfig = require("./configs/database");
const mainRoute = require("./routers/index.route");

const app = express();

databaseConfig.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mainRoute(app);


app.listen(3000, () => {
  console.log("App listen on port", 3000);
});
