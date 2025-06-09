import React, { useState } from "react";
import "./CreatePost.css";

const CreatePost = () => {
  const [image, setImage] = useState(null); // for preview
  const [imageFile, setImageFile] = useState(null); // for sending to server
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handlePostCreation = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("postTitle", postTitle);
      formData.append("postContent", postContent);
      if (imageFile) {
        formData.append("postImage", imageFile);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/post/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log("Post created successfully:", data);

      // Clear form on success
      setPostTitle("");
      setPostContent("");
      setImage(null);
      setImageFile(null);

      // Optionally, navigate or update UI with the newly created post
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="create-post-page">
      <div className="create-post-container">
        <h2>Create a New Post</h2>
        <p>Share your experience, idea or crop issue with the community.</p>

        <label>Title of the Post</label>
        <input
          type="text"
          placeholder="Enter post title"
          name="postTitle"
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
        />

        <label>Description</label>
        <textarea
          placeholder="Write description..."
          rows="4"
          name="postContent"
          onChange={(e) => {
            setPostContent(e.target.value);
          }}
          value={postContent}
        />

        <label>Upload Image</label>
        <div className="image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name="postImage"
          />
        </div>

        {image && (
          <div className="image-preview">
            <img src={image} alt="Preview" />
          </div>
        )}

        <button type="submit" onClick={handlePostCreation}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
