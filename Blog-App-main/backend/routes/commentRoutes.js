const express = require("express");
const router = express.Router();

const {
  getUserComments,
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

// GET USER'S OWN COMMENTS - MUST BE BEFORE /:articleId ROUTE
router.get("/user/my-comments", protect, getUserComments);

// GET COMMENTS FOR ARTICLE
router.get("/:articleId", getComments);

// ADD COMMENT
router.post("/:articleId", protect, addComment);

// UPDATE COMMENT
router.put("/:id", protect, updateComment);

// DELETE COMMENT
router.delete("/:id", protect, deleteComment);

module.exports = router;