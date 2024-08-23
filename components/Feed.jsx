"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filteredPosts = posts.filter(
        (post) =>
          post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
          post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
          post.creator.username.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPosts(filteredPosts);
    }
  }, [searchText]);

  return (
    <div>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input"
          />
        </form>
        <PromptCardList
          data={searchText ? filteredPosts : posts}
          searchWord={searchText.toLowerCase()}
          // handleTagClick={handleTagClick}
        />
      </section>
    </div>
  );
};

export default Feed;
