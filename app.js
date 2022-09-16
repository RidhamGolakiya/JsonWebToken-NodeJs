require('dotenv').config();
require('./database/connection');
const express = require("express");
const app = express();
const port = process.env.port || 3000;
const userRoutes = require("./routes/user");

app.use(express.json());
app.use("/api",userRoutes);

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
})