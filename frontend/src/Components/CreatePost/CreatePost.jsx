import React, { useState } from "react";
import "./CreatePost.css";

const CreatePost = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="create-post-page">
      <div className="create-post-container">
        <h2>Create a New Post</h2>
        <p>Share your experience, idea or crop issue with the community.</p>

        <label>Title of the Post</label>
        <input type="text" placeholder="Enter post title" />

        <label>Description</label>
        <textarea placeholder="Write description..." rows="4"></textarea>

        <label>Upload Image</label>
        <div className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {image && (
          <div className="image-preview">
            <img src={image} alt="Preview" />
          </div>
        )}

        <button type="submit">Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
