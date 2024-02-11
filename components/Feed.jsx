'use client';

import {useState , useEffect} from 'react'

import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick = {handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [mainPost,setMainPost] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);


  const handleTagClick = (e) => {
    setSearchText(e);
  }

  const handleSearchChange = (e) => {
    setSearchText (e.target.value);
    
  }

  useEffect(()=>{
    const fetchPosts = async () => {

      const response = await fetch('/api/prompt');
      const data = await response.json();

      setMainPost(data);
      setPosts(data);
    }
    if(searchText===""){
      fetchPosts();
    }else{
      const filteredPosts = mainPost.filter((p) => p.tag.includes(searchText) || p.creator.username.includes(searchText) || p.prompt.includes(searchText));
      /* const filteredPosts = posts.filter((p)=> p.tag === e.target.value); */
      setPosts(filteredPosts);
      /* const response = await fetch(`/api/search/${e.target.value}`);
      const data = await response.json(); */
   

    }
  },[searchText])

  useEffect (()=>{
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setMainPost(data);
      setPosts(data);
    }

    fetchPosts();
  },[])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
        type='text'
        placeholder='Search for a tag or a username.'
        value={searchText}
        onChange={(e) => handleSearchChange(e)} 
        required
        className='search_input peer'
        ></input>
      </form>

      <PromptCardList
        data={posts}
        handleTagClick= {(e) => handleTagClick(e)}
      />
    </section>
  )
}

export default Feed