"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-10 mb-10 prompt_layout flex-row">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  //search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/prompt");
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleButtonClick = (buttonName) => {
    setSearchText(buttonName);

    const searchResult = filterPrompts(buttonName);
    setSearchedResults(searchResult);
  };

  const handleClear = () => {
    setSearchText("");
  };

  return (
    <section className="feed">
      <div className="w-full flex max-sm:hidden flex-center flex-row mb-10 gap-2 ">
        <button
          className="outline_btn blue_gradient"
          onClick={() => {
            handleButtonClick && handleButtonClick("React");
          }}
        >
          React
        </button>
        <button
          className="outline_btn blue_gradient"
          onClick={() => {
            handleButtonClick && handleButtonClick("Node");
          }}
        >
          Node
        </button>
        <button
          className="outline_btn blue_gradient"
          onClick={() => {
            handleButtonClick && handleButtonClick("SQL");
          }}
        >
          SQL
        </button>
        <button
          className="outline_btn blue_gradient"
          onClick={() => {
            handleButtonClick && handleButtonClick("CV");
          }}
        >
          CV
        </button>
        <button
          className="outline_btn blue_gradient"
          onClick={() => {
            handleButtonClick && handleButtonClick("Tech");
          }}
        >
          Tech
        </button>
        <button
          className="outline_btn blue_gradient"
          // onClick={() => router.push("/create-prompt")}
        >
          More+
        </button>
      </div>

      <form className="relative flex-center w-full">
        <input
          type="text"
          placeholder="Search for a Prompt / Tag..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <div className="w-full flex-center flex-row mt-5 gap-5">
        <button className="outline_btn blue_gradient" onClick={handleClear}>
          Clear all
        </button>
        <button
          className="outline_btn blue_gradient"
          onClick={() => {
            // router.push("/create-prompt");
          }}
        >
          Create
        </button>
      </div>

      {/* All Prompts */}
      {isLoading === true ? (
        <Loader />
      ) : searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
