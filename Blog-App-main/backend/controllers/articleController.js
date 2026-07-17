const Article = require("../models/Article");
const Comment = require("../models/Comment");

// CREATE ARTICLE
exports.createArticle = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const article = await Article.create({
      title,
      content,
      category: category || "Other",
      image: req.file ? `uploads/${req.file.filename}` : "",
      author: req.user._id,
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ARTICLES
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isDeleted: false })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE ARTICLE
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("author", "name email");

    if (!article || article.isDeleted) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ARTICLE
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // only owner or admin
    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;
    article.category = req.body.category || article.category;

    if (req.file) {
      article.image = `uploads/${req.file.filename}`;
    }

    const updated = await article.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ARTICLE
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (req.query.permanent === "true") {
      await Comment.deleteMany({ article: article._id });
      await article.deleteOne();
      return res.json({ message: "Article permanently deleted" });
    }

    article.isDeleted = true;
    article.deletedAt = new Date();

    await article.save();

    res.json({ message: "Article moved to trash" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RESTORE ARTICLE
exports.restoreArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    article.isDeleted = false;
    article.deletedAt = null;

    await article.save();

    res.json({ message: "Article restored" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET DELETED ARTICLES
exports.getDeletedArticles = async (req, res) => {
  try {
    console.log("USER ROLE:", req.user.role);

    let query = { isDeleted: true };

    if (req.user.role === "author") {
      query.author = req.user._id;
    }

    const articles = await Article.find(query)
      .populate("author", "name email");

    console.log("DELETED ARTICLES:", articles.length);

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
