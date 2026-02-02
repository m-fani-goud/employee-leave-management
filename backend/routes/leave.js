const router = require("express").Router();
const db = require("../config/db");

/* ================= APPLY LEAVE ================= */
router.post("/apply", (req, res) => {
  const { userId, leaveType, startDate, endDate, reason } = req.body;

  db.query(
    `INSERT INTO leave_requests 
     (user_id, leave_type, start_date, end_date, reason)
     VALUES (?,?,?,?,?)`,
    [userId, leaveType, startDate, endDate, reason],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Leave applied successfully" });
    }
  );
});

/* ================= MANAGER VIEW ================= */
router.get("/manager", (req, res) => {
  db.query(
    `SELECT lr.*, u.email 
     FROM leave_requests lr
     JOIN users u ON lr.user_id = u.id
     ORDER BY lr.created_at DESC`,
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    }
  );
});

/* ================= APPROVE / REJECT ================= */
router.put("/approve/:id", (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  db.query(
    "UPDATE leave_requests SET status=? WHERE id=?",
    [status, id],
    () => res.json({ message: "Status updated" })
  );
});

/* ================= ✅ MY LEAVES (FIX) ================= */
router.get("/my/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    `SELECT * FROM leave_requests 
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    }
  );
});
/* ================= TEAM OVERVIEW (MANAGER) ================= */
router.get("/team-overview", (req, res) => {
  const query = `
    SELECT 
      u.id,
      u.name,
      u.email,
      SUM(CASE WHEN lr.status IS NOT NULL THEN 1 ELSE 0 END) AS total,
      SUM(CASE WHEN lr.status = 'Approved' THEN 1 ELSE 0 END) AS approved,
      SUM(CASE WHEN lr.status = 'Pending' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN lr.status = 'Rejected' THEN 1 ELSE 0 END) AS rejected
    FROM users u
    LEFT JOIN leave_requests lr ON u.id = lr.user_id
    WHERE u.role = 'employee'
    GROUP BY u.id
  `;

  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});
/* ============ MANAGER DASHBOARD STATS ============ */
router.get("/manager/stats", (req, res) => {
  const query = `
    SELECT
      SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approved,
      SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected
    FROM leave_requests
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});
/* ============ EMPLOYEE DASHBOARD STATS ============ */
router.get("/employee/stats/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT
      SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approved,
      SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected
    FROM leave_requests
    WHERE user_id = ?
  `;

  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});
/* ========= MANAGER DASHBOARD STATS ========= */
router.get("/manager/stats", (req, res) => {
  const query = `
    SELECT
      SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approved,
      SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected
    FROM leave_requests
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);

    // Ensure numbers (not null)
    res.json({
      pending: result[0].pending || 0,
      approved: result[0].approved || 0,
      rejected: result[0].rejected || 0,
    });
  });
});



module.exports = router;
