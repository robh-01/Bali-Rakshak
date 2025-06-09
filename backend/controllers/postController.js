import { createPost, getPosts, getPostById } from "../db/postQueries.js";
import multer from "multer";

const storage = multer.diskStorage({
  //set the destination to save the file
  // Note: You are responsible for creating the directory when providing destination as a function.
  // When passing a string, multer will make sure that the directory is created for you.
  destination: function (req, file, cb) {
    cb(null, "./postImages/");
  },

  filename: function (req, file, cb) {
    //generating a unique name for the file so that the chances of collision are very low
    // using the current timestamp and a random UUID to generate a unique name for the file
    // using the first part of the UUID (works for upto 1million file uploads per second)

    const date = Date.now(); // Get the current timestamp
    const randomUUID = crypto.randomUUID().split("-")[0]; // using only the first part of the UUID.
    const fileName = `${date}-${randomUUID}.${file.originalname
      .split(".")
      .pop()}`; // Append the file extension
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([
  { name: "postTitle", maxCount: 1 },
  { name: "postContent", maxCount: 1 },
  { name: "postImage", maxCount: 1 },
]);

const postCreatePost = [
  cpUpload,
  (req, res, next) => {
    //   path: "postImages/1749404616145-ba20c1c4.jpg",
    // console.dir(req.files, { depth: null });

    // mocking user for now
    req.user = {
      id: 5,
    };

    const { postTitle, postContent } = req.body;
    const postImagePath = req.files.postImage[0].path;
    const post = {
      title: postTitle,
      content: postContent,
      imagePath: postImagePath,
      authorId: req.user.id, // Assuming req.user is set by authentication middleware
    };
    createPost(post)
      .then((createdPost) => {
        return res.status(201).json({
          message: "Post created successfully",
          post: createdPost,
        });
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Internal server error" });
      });
  },
];

//return all posts with title, content, description
async function allPostGet(req, res) {
  try {
    const posts = await getPosts();
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// return a post with title, content, imagePath, comments
async function postByIdGet(req, res) {
  const postId = parseInt(req.params.postId);
  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }
  try {
    const post = await getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { postCreatePost, allPostGet, postByIdGet };
