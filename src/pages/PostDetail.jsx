import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase-config';

export function PostDetail() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { id } = useParams();

    useEffect (() => {
        const fetchPost = async () => {
            try {
                const docRef = db.collection('posts').doc(id);
                const doc = await docRef.get();
                if (doc.exists) {
                    setPost({ id: doc.id, ...doc.data() });
                } else {
                    setError('Post not found');
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch post: ' + err.message);
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return(
        <div>
            {post ? (
                <div>
                    <h2 className='text-3xl font-bold'>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ) : <p>Post not found!</p>
            }
        </div>
    )
}