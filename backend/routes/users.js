const router = require("express").Router();
const db = require("../config/db");

router.get("/employees", (req, res) => {
  db.query(
    "SELECT id, name, email, role FROM users WHERE role='employee'",
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    }
  );
});

module.exports = router;
