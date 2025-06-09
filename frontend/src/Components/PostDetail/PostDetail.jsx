import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PostDetail.css";

const PostDetail = () => {
  const { postId } = useParams(); // Demo post data
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Fetch post data based on postId
    fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/post/${postId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch post");
        return res.json();
      })
      .then((data) => {
        console.log(data);

        setPost(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [postId]);

  const handleAddComment = async () => {
    if (!comment.trim()) return; // Prevent empty comments

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/comment/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ commentContent: comment }),
        }
      );

      if (!response.ok) throw new Error("Failed to add comment");

      const newComment = await response.json();
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...(prevPost.comments || []), newComment],
      }));
      setComment(""); // Clear the comment input
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  if (!post) return <div>Loading...</div>;

  return (
    <>
      <div className="community-post-header">
        <div className="community-post-main">
          <h1 className="community-post-title">Community Post</h1>
          <p className="community-post-subtitle">
            Explore insights and experiences from farmers
          </p>
        </div>
      </div>
      <div className="post-detail-container">
        <div className="post-detail-card">
          <h1 className="post-title">{post.title}</h1>
          <p className="post-author">
            By: {post.author?.name || "Unknown User"}
          </p>
          <img
            src={`${import.meta.env.VITE_BACKEND_SERVER_URL}/${post.imagePath}`}
            alt={post.title}
            className="post-image"
          />
          <p className="post-description">{post.content}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h2>Discussion</h2>

        {/* Comment Input */}
        <div className="comment-form">
          <div className="comment-avatar">
            <img
              src="https://th.bing.com/th/id/OIP.9QoXfqFLKt7SVlVT85ao0wHaE7?r=0&w=2048&h=1365&rs=1&pid=ImgDetMain"
              alt="User"
            />
          </div>
          <textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="send-button"
            onClick={handleAddComment}
          >
            Send
          </button>
        </div>

        {/* Comments List */}
        <div className="comments-list">
          {post?.comments && post.comments.length > 0 ? (
            [...post.comments].reverse().map((cmt) => (
              <div key={cmt.id} className="comment-item">
                <div className="comment-avatar"></div>
                <div className="comment-content">
                  <strong>{cmt.author?.name}{cmt.author.isExpert? <span className="expert"> Expert</span>:" "}</strong> 
                  <p>{cmt.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#888", textAlign: "center" }}>
              No comments available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
