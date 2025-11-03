import express from "express";
import db from "../../db/db.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate, reason, status } = req.body;

    
    const leaveStatus = status || "Pending";

  
    const [result] = await db.execute(
      `INSERT INTO leaves (employeeId, leaveType, startDate, endDate, reason, status, appliedOn)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [employeeId, leaveType, startDate, endDate, reason, leaveStatus]
    );

    res.status(201).json({
      message: " Leave applied successfully",
      leave: {
        id: result.insertId,
        employeeId,
        leaveType,
        startDate,
        endDate,
        reason,
        status: leaveStatus,
      },
    });
  } catch (error) {
    console.error(" Error applying leave:", error);
    res.status(500).json({ error: "Failed to apply leave" });
  }
});

export default router;
