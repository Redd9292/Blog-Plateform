import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';

export function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = db.collection('posts').get();
            const data = await response.get();
            const postData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setPosts(postData);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1 className='text-3xl font-bold underline'>Latest Posts</h1>
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h2 className='text-2xl'>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))} 
            </div>
        </div>
    );
}