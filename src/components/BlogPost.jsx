import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';

export function BlogPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await db.collection('posts').get();
            const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));  
            setPosts(postsData);
        };
        fetchData();
    }, []);

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    )
}