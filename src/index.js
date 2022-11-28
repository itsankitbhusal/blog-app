import express from "express";
import passport from "passport";
import "dotenv/config";
import cors from "cors";
import Auth from "./routes/authRoute.js";
import Category from "./routes/categoryRoute.js";
import Post from "./routes/postRoute.js";
import Comment from "./routes/commentRoute.js";
import dbConnection from "./models/index.js";
import passport from "passport";
import bodyParser from "body-parser";
import * as strategy from "./strategies/googleStrategy.js";

import * as googleStrategy from "./strategies/googleStrategy.js";

const app = express();

// need to use this to parse the body of the request
// it takes 1hr to find this 😭 😭
app.use(express.json()); // ✅
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());

app.use(passport.initialize());

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Root Route");
});

// auth route
app.use("/auth", Auth);

// category route
app.use("/category", Category);

// post route
app.use("/post", Post);

// comment route
app.use("/comment", Comment);

app.listen(process.env.PORT || 8000, async () => {
  console.log("\nServer Started 🚀");
  console.log(`http://localhost:${process.env.PORT}\n`);
  try {
    dbConnection.authenticate();
    dbConnection.sync({ force: false });
    console.log("Database connection successful!!");
  } catch (error) {
    console.log("Error connecting to database: s", error);
  }
});
