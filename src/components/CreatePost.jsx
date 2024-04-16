import React, { useState } from 'react';
import { db, auth } from '../firebase-config';

export function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const submitPost = async () => {
        try {
            await db.collection('posts').add({
                title: title,
                content: content,
                createAt: new Date()
            });
            console.log('Post created');
        }catch (error) {
            console.error('Error creating post:', error.message);
        }
    };

    return(
        <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
            <button onClick={submitPost}>Submit Post</button>
        </div>
    )
}