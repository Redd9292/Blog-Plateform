import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore/lite';

export function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'posts'));
            const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setPosts(postsData);
            setLoading(false);
          } catch (err) {
            setError(err.message);
            setLoading(false);
          }
        };
        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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