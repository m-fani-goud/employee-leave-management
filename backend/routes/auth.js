const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../config/db");

/**
 * ================= REGISTER =================
 */
router.post("/register", async (req, res) => {
  let { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  // ✅ NORMALIZE ROLE (VERY IMPORTANT)
  role = role.trim().toLowerCase();

  if (!["employee", "manager", "hr"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [name, email, hashedPassword, role],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ message: "Email already registered" });
        }
        return res.status(500).json(err);
      }

      // Initialize leave balance ONLY for employees
      if (role === "employee") {
        db.query(
          "INSERT INTO leave_balances (user_id,annual,sick,casual) VALUES (?,?,?,?)",
          [result.insertId, 12, 5, 3]
        );
      }

      res.json({ message: "Registration successful" });
    }
  );
});

/**
 * ================= LOGIN =================
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, users) => {
      if (err) return res.status(500).json(err);

      if (users.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid email or password" });
      }

      const user = users[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res
          .status(401)
          .json({ message: "Invalid email or password" });
      }

      // ✅ RETURN CLEAN USER OBJECT (CRITICAL FIX)
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.trim().toLowerCase(),
      });
    }
  );
});

/**
 * ================= FORGOT PASSWORD =================
 */
router.post("/forgot-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  db.query(
    "SELECT id FROM users WHERE email=?",
    [email],
    (err, users) => {
      if (users.length === 0) {
        return res
          .status(404)
          .json({ message: "Email not registered" });
      }

      db.query(
        "UPDATE users SET password=? WHERE email=?",
        [hashedPassword, email],
        () => {
          res.json({ message: "Password reset successful" });
        }
      );
    }
  );
});

module.exports = router;
