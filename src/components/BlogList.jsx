import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore'; 

export function BlogList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
               
                const querySnapshot = await getDocs(collection(db, 'posts'));
                const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(postsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <article key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </article>
                ))
            ) : (
                <p>No posts found!</p> 
            )}
        </div>
    );
}
