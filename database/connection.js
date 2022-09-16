const mongoose = require("mongoose");
const db = process.env.MONGO_URL;

mongoose.connect(db).then(() =>{
    console.log("Database Connected");
})
