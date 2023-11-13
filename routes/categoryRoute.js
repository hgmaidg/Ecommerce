const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} = require("../controller/prodcategoryCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.get("/", authMiddleware, isAdmin, getallCategory);
router.get("/:id", authMiddleware, isAdmin, getCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;
