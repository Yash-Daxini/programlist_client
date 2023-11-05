const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const db = require("../dbConnections");

db.once("open", () => console.log("Connection Initiated"));

router.get("/", async (req, res) => {
  let collection = await db.collection("SEC_User");
  let result = await collection.find({}).toArray();
  res.send(result).status(200);
});
let ObjectId = mongoose.Types.ObjectId;
router.get("/:id", async (req, res) => {
  let collection = await db.collection("SEC_User");
  let result = await collection.findOne({ _id: new ObjectId(req.params.id) });
  res.send(result).status(200);
});
router.post("/", async (req, res) => {
  let collection = await db.collection("SEC_User");
  let result = await collection.insertOne({
    user_name: req.body.user_name,
    user_password: req.body.user_password,
    user_emailaddress: req.body.user_emailaddress,
    user_mobilenumber: req.body.user_mobilenumber,
  });
  res.send(result).status(200);
});
router.put("/:id", async (req, res) => {
  let collection = await db.collection("SEC_User");
  let result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        user_name: req.body.user_name,
        user_password: req.body.user_password,
        user_emailaddress: req.body.user_emailaddress,
        user_mobilenumber: req.body.user_mobilenumber,
      },
    }
  );
  res.send(result).status(200);
});
router.delete("/:id", async (req, res) => {
  let collection = await db.collection("SEC_User");
  let result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.send(result).status(200);
});

module.exports = router;
