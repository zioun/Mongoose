const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

// import
const booksRoute = require("./routes/book/book.routes.js");

// middleware
const app = express();
app.use(express.json());
app.use("/api/v1/books", booksRoute); 

// routes
app.get("/", (req,res) => {
  res.send("Blog app Home");
})

app.get("/health", (req,res) => {
  res.status(200).send({health: "Health is good"});
})


// connection url
let connectionUrl = process.env.MONGO_URL;
connectionUrl = connectionUrl.replace(
  "<username>",
  process.env.MONGOOSE_USER_NAME
);
connectionUrl = connectionUrl.replace(
  "<password>",
  process.env.MONGOOSE_USER_PASSWORD
);

connectionUrl = `${connectionUrl}/${process.env.DB_NAME}?${process.env.QUERY_STRING}`;

const port = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(connectionUrl);
    app.listen(port);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Connection Faild");
  }
}
main();
