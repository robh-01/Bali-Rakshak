import React from "react";
import "./CommunityPagePosts.css";
import { Link } from "react-router-dom";

const CommunityPage = () => {
  // Mock data for posts
  const posts = [
    {
      id: 1,
      title: "How to manage blight in tomato crops?",
      description:
        "I've noticed some blight on my tomato plants. What are the best ways to manage it and prevent further spread?",
      imageUrl:
        "https://www.thespruce.com/thmb/SJNecXN-bnX169CR0dOYIC4EEpI=/5750x0/filters:no_upscale():max_bytes(150000):strip_icc()/top-tomato-growing-tips-1402587-10-f09428178dbe4e64b88189ea97d831b8.jpg",
    },
    {
      id: 2,
      title: "Best practices for organic pest control",
      description:
        "Looking for lorejhfkhk dsjhjah jkhdjhakj uheurga uhufgjhgre uigfuigs ugsufgs gsiugiulfs iugsiufgiu gsdiufgisu  usidfugsiu uhsdfihgsiugiufshgiluhsdilugsirul usdfhiugsil usgdiufgshiu iusgdiusg iusgdfiusg iusgiusg usgisgiu sugiufsgli usgius effective organic pest control methods. Any recommendations for dealing with aphids and caterpillars?",
      imageUrl:
        "https://growtre.com/wp-content/uploads/2022/07/1-philip-junior-mail-BpUkWK6hfJA-1-1024x678.jpg",
    },
    {
      id: 3,
      title: "Soil health improvement techniques",
      description:
        "What are some proven techniques to improve soil health and fertility for better crop yields?",
      imageUrl:
        "https://th.bing.com/th/id/R.b5c0bbbb506f82dab9363cd6190bc91e?rik=qolbCTMe2kkRWw&pid=ImgRaw&r=0",
    },
  ];

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
        {posts.map((post) => (
          <div key={post.id} className="discussion-card">
            <div className="discussion-content">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <button className="view-button">View</button>
            </div>
            <div className="discussion-image">
              <img src={post.imageUrl} alt={post.title} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CommunityPage;
