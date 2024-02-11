'use client';



import {useState,useEffect} from 'react';
import { useRouter,useSearchParams  } from 'next/navigation';

import Profile from '@components/Profile';


const MyProfile = ({params}) => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const name = searchParams.get('name');

    useEffect (()=>{
        
        const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params.id}/posts`);
        const data = await response.json();
    
          setPosts(data);
        }
    
     
        fetchPosts();
        
        
    },[])


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this ?");

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: "DELETE"
                })

                const filteredPosts = posts.filter((p)=> p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

  return (
    <Profile 
        name= {name}
        desc = "Welcome to your profile"
        data={posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
  )
}

export default MyProfile;