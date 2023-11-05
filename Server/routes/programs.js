const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../dbConnections");

// selectall

router.get("/", async (req, res) => {
  let collection = await db.collection("MST_Program");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// select by id
const ObjectId = mongoose.Types.ObjectId;
router.get("/:id", async (req, res) => {
  let collection = await db.collection("MST_Program");
  let results = await collection.findOne({ _id: new ObjectId(req.params.id) });
  res.send(results).status(200);
});
// insert
router.post("/", async (req, res) => {
  let collection = await db.collection("MST_Program");
  let results = await collection.insertOne({
    program_name: req.body.program_name,
    program_topic: req.body.program_topic,
    program_link: req.body.program_link,
    solution_link: req.body.solution_link,
    difficulty: req.body.difficulty,
    issolved: req.body.issolved,
  });
  res.send(results).status(201);
});
// update by id
router.put("/:id", async (req, res) => {
  let collection = await db.collection("MST_Program");
  let results = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        program_name: req.body.program_name,
        program_topic: req.body.program_topic,
        program_link: req.body.program_link,
        solution_link: req.body.solution_link,
        difficulty: req.body.difficulty,
        issolved: req.body.issolved,
      },
    }
  );
  res.send(results).status(201);
});
// delete by id
router.delete("/:id", async (req, res) => {
  let collection = await db.collection("MST_Program");
  let results = await collection.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(results).status(200);
});

/* get by topic name using req.query or parameters in key value pair */

// router.get("/", async (req, res) => {
//   let collection = await db.collection("MST_Program");
//   let result;
//   if (req.query.program_topic === undefined) {
//     result = await collection.find({}).toArray();
//   } else {
//     result = await collection
//       .find({ program_topic: req.query.program_topic })
//       .collation({ locale: "en", strength: 2 })
//       .toArray();
//   }
//   res.send(result).status(200);
// });

router.get("/topics/:topic_name", async (req, res) => {
  let collection = await db.collection("MST_Program");
  let result = await collection
    .find({ program_topic: req.params.topic_name })
    .collation({ locale: "en", strength: 2 })
    .toArray();
  res.send(result).status(200);
});
module.exports = router;
