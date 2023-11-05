const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Open"));

module.exports = db;