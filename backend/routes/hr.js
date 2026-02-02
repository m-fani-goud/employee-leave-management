const router = require("express").Router();
const db = require("../config/db");

/* ===== HR DASHBOARD STATS ===== */
router.get("/dashboard-stats", (req, res) => {
  const query = `
    SELECT
      (SELECT COUNT(*) FROM users WHERE role='employee') AS totalEmployees,
      (SELECT COUNT(*) FROM leave_requests WHERE status='Approved') AS approved,
      (SELECT COUNT(*) FROM leave_requests WHERE status='Pending') AS pending,
      (SELECT COUNT(*) FROM leave_requests WHERE status='Rejected') AS rejected
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      totalEmployees: result[0].totalEmployees || 0,
      approved: result[0].approved || 0,
      pending: result[0].pending || 0,
      rejected: result[0].rejected || 0,
    });
  });
});

module.exports = router;
