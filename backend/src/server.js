const express = require("express");
const morgan = require("morgan")
const app = express();
app.use(morgan('dev'));

app.use(express.json());

app.listen(3000, () => {
    console.log("Port 3000 da ishlayapti");

}
)