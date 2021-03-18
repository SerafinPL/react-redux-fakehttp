import * as actionTypes from './actionTypes';

import axiosInstance from '../axios';



export const getPost = () => {
	return (dispatch) => {

		axiosInstance.get('/posts')
    		.then(response => {
		        const posts = response.data.slice(0, 5);
		        const updatedPosts = posts.map(post => {
		            return {
		                ...post,
		                author: 'Kuba'
		            }

		        });
		        dispatch( saveResult(updatedPosts) );
			})
    		.catch(error => {
		        // handle error
		        console.log(error);
		        dispatch( saveError(error) );
		        
		    });
    }
}

export const saveResult = ( post ) => {
	// const upDatedResult = res * 2;
	return {
		type: actionTypes.STORE_RESULT,
		result: post, //upDatedResult
		error: false 

	};
}

export const saveError = ( error ) => {
	return {
		type: actionTypes.STORE_RESULT,
		result: error, //chose error
		error: true
	};
}