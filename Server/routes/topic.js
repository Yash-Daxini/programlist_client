const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const db = require("../dbConnections");

router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("MST_ProgramTopic");
    let result = await collection.find({}).toArray();
    res.send(result).status(200);
  } catch {
    res.send("Some error occured! Can't Fetch Data").status(500);
  }
});
let ObjectId = mongoose.Types.ObjectId;
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("MST_ProgramTopic");
    let result = await collection.findOne({ _id: new ObjectId(req.params.id) });
    res.send(result).status(200);
  } catch {
    res.send("Some error occured! Can't Fetch Data").status(500);
  }
});
router.post("/", async (req, res) => {
  try {
    let collection = await db.collection("MST_ProgramTopic");
    let result = await collection.insertOne({
      topic_name: req.body.topic_name,
    });
    res.send(result).status(200);
  } catch {
    res.send("Some error occured! Can't insert data");
  }
});
router.put("/:id", async (req, res) => {
  try{
    let collection = await db.collection("MST_ProgramTopic");
    let result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          topic_name: req.body.topic_name,
        },
      }
    );
    res.send(result).status(200);
  }
  catch{
    res.send("Some error occured! Can't update data");
  }
});
router.delete("/:id", async (req, res) => {
  try{
    let collection = await db.collection("MST_ProgramTopic");
    let result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result).status(200);
  }
  catch{
    res.send("Some error occured! Can't delete data");
  }
});
router.delete("/deleteFromTopic/:topic_name", async (req, res) => {
  try {
    let collection = await db.collection("MST_ProgramTopic");

    // const caseSensitiveRegex = new RegExp(`^${req.params.topic_name}$`);

    // const query = { topic_name: { $regex: caseSensitiveRegex } };

    // const result = await collection.deleteOne(query);
    // console.log(caseSensitiveRegex + " " + result);
    let result = await collection.deleteOne({
      topic_name: req.params.topic_name,
    });
    res.send(result).status(200);
  } catch (e) {
    res.send("Some error occured! Can't delete data");
  }
});

module.exports = router;
