import express from "express";
import pool from "../../db/db.js";

const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM recruitment WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: " Job not found" });
    }

    res.json({ message: " Job deleted successfully" });
  } catch (error) {
    console.error(" Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

export default router;
