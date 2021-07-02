const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.get("/", async (req, res, next) => {
  const tags = await getAllTags();
  res.send({
    tags,
  });
  return tags;
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const tagName = req.params.tagName;
  try {
    const getPostMatches = await getPostsByTagName(tagName);
    const posts = getPostMatches.filter((post) => {
      return post.active || (req.user && post.author.id === req.user.id);
    });
    res.send({ posts });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
