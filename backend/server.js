const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/leave", require("./routes/leave"));
app.use("/api/hr", require("./routes/hr"));
app.use("/api/users", require("./routes/users"));

app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
