"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredTag, setFilteredTag] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (filteredTag && filteredTag !== searchText) setFilteredTag('');
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt?tag=${filteredTag}`);
      if (filteredTag) setSearchText(filteredTag);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
    if (searchText) {
      const filteredPosts = posts.filter(
        (post) =>
          post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
          post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
          post.creator.username.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPosts(filteredPosts);
    }
  }, [filteredTag, searchText]);

  const handleTagClick = (tag) => {
    setFilteredTag(tag);
  }

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
          handleTagClick={handleTagClick}
        />
      </section>
    </div>
  );
};

export default Feed;
