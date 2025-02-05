const express = require("express");
const rootrouter = require("./routes/index");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootrouter);
app.listen(4000);
