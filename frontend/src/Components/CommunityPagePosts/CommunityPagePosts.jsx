import React, { useEffect, useState } from "react";
import "./CommunityPagePosts.css";
import { Link, useNavigate } from "react-router-dom";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/post`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error loading posts");
        setLoading(false);
      });
  }, []);
  const navigate = useNavigate();

  function handleCardClick(postId) {
    return navigate(`/app/community/post/${postId}`);
  }

  return (
    <div className="community-page">
      <header>
        <h1>Community</h1>
        <Link to="/app/community/new">
          <button className="create-post-button">Create Post</button>
        </Link>
      </header>

      <section className="search-bar">
        <input type="text" placeholder="Search posts" />
      </section>

      <section className="trending-discussions">
        <h2>Trending Discussions</h2>
        {loading && <p>Loading posts...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          posts.map((post) => (
            <div
              key={post.id}
              className="discussion-card"
              onClick={() => handleCardClick(post.id)}
            >
              <div className="discussion-content">
                <h3>{post.title}</h3>
                <p>{post.content || post.description}</p>
                <button className="view-button">View</button>
              </div>
              <div className="discussion-image">
                <img
                  src={`${import.meta.env.VITE_BACKEND_SERVER_URL}/${
                    post.imagePath
                  }`}
                  alt={post.title}
                />
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default CommunityPage;
