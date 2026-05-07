import express from "express";

const router = express.Router();

const posts = [
  { id: 1, title: "첫 번째 글", content: "안녕하세요" },
  { id: 2, title: "두 번째 글", content: "안녕히가세요" },
];

router.get("/", (req, res) => {
  res.json(posts);
});

router.get("/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts.find((post) => post.id === Number(postId));
  res.json(post);
});

router.post("/", (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put("/:id", (req, res) => {
  const postId = req.params.id;
  const updatedPost = req.body;
  posts[Number(postId) - 1] = updatedPost;
  res.json(updatedPost);
});

router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  users.splice(Number(postId) - 1, 1);
  res.status(204).send();
});

export default router;
