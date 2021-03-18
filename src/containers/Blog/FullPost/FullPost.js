import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './FullPost.css';

const FullPost =(props) => {

    const [loadedPostHook, loadedPostSetHook] = useState(null) 
    
    
    useEffect(()=>{
        loadedData();
    });
    
    const loadedData = () => {
        if (props.match.params.postId){
            if (!loadedPostHook || 
                ( loadedPostHook && loadedPostHook.id !== +props.match.params.postId )){
                axios.get('/posts/' + props.match.params.postId)
                    .then(response => {
                        loadedPostSetHook(response.data);
                    })
                    .catch(error =>{
                        loadedPostSetHook({title: 'błąd odczytu'});
                    });
            }
        }
    }

    const deletePostHandler = () =>{
        axios.delete('/posts/' + props.match.params.postId)
        .then(response => {
            console.log(response);//fake delete
            props.history.push('/posts');
        });
    }

    //render () {
        let post = <p style={{textAlign: 'center'}}>Nie odnaleziono takiego fake posta!</p>;
        
        if (props.match.params.postId){
            post = <p style={{textAlign: 'center'}}>Ładowanie...</p>;
        }

        if (loadedPostHook){
            post = (
                <div className="FullPost">
                    <h1>{loadedPostHook.title}</h1>
                    <p>{loadedPostHook.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={deletePostHandler}>Usuń Post</button>
                    </div>
                </div>

            );
        }
        return post;
    //}
}

export default FullPost;