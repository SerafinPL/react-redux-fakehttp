import React, { useState } from 'react';

import './NewPost.css';

import axios from 'axios';

import { Redirect } from 'react-router-dom';

//class NewPost extends Component {
const NewPost = (props) => {
    // state = {
    //     title: '',
    //     content: '',
    //     author: 'Kuba',
    // }
    const [titleHook, titleSetHook] = useState('');
    const [contentHook, contentSetHook] = useState('');
    const [authorHook, authorSetHook] = useState('');

    const postDataHandler = () => {
        const sendPost = {
            title: titleHook,
            content: contentHook,
            author: authorHook
        }

        axios.post('/posts', sendPost)
        .then(response => {
            console.log(response);
            props.history.replace('/posts'); 
        });
    }

    

   

    return (
        <div className="NewPost">
             
            <h1>Dodaj Post</h1>
            <label>Tytuł</label>
            <input type="text" value={titleHook} onChange={(event) => titleSetHook(event.target.value) } />
            <label>Zawartość</label>
            <textarea rows="4" value={contentHook} onChange={(event) => contentSetHook(event.target.value) } />
            <label>Autor</label>
            <select value={authorHook} onChange={(event) => authorSetHook(event.target.value) }>
                <option value="Kuba">Kuba</option>
                <option value="Anita">Anita</option>
            </select>
            <button onClick={postDataHandler}>Dodaj Post</button>
        </div>
    );
    
}

export default NewPost;