const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./rauter");
const errorHandler = require("./middlewere/errorHandler");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(routes);

app.use((req, res) => {
  res.status(404).json({ message: "Yo'l topilmadi" });
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Port 3000 da ishlayapti");
});
