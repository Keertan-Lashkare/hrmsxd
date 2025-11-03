import express from "express";
import db from "../../db/db.js";
const router = express.Router();


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

 
    const [result] = await db.execute("DELETE FROM leaves WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Leave not found" });
    }

    res.json({ message: " Leave deleted successfully" });
  } catch (error) {
    console.error(" Error deleting leave:", error);
    res.status(500).json({ error: "Failed to delete leave" });
  }
});

export default router;
