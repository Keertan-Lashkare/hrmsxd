import express from "express";
import pool from "../../db/db.js";

const router = express.Router();



router.put("/:id/:status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [result] = await pool.query(
      "UPDATE applications SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    const [updatedApp] = await pool.query(
      "SELECT * FROM applications WHERE id = ?",
      [id]
    );

    res.json({
      message: `Application ${status.toLowerCase()} successfully`,
      application: updatedApp[0],
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Failed to update application status" });
  }
});

export default router;
