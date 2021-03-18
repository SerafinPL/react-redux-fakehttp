import React, {useEffect} from 'react';

//import axiosInstance from '../../../axios';

import Post from '../../../components/Post/Post';
import './Posts.css';
import { Link, Route } from 'react-router-dom'
import FullPost from '../FullPost/FullPost';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actionCreators';


const Posts = (props) => {




    useEffect(()=>{
        //console.log(props);
        props.RedDisStore();
    })
    

    const postSelectedHandler = (id) => {
        props.history.push('/posts/' + id);

    }

	

	let posts = <p style={{textAlign : 'center'}}>Ładowanie postów</p>

    if (props.RedError) {posts = <p style={{textAlign : 'center'}}>Coś jest nie tak pojawił się ERROR</p>};

    if (!props.RedError && props.RedLoad){
        posts = props.RedPost.map(post => {
            return( 
                <Post 
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => postSelectedHandler(post.id)}
                />
            );//return
        });//map
    }; //if


	return(
        <div>
            <Route path={props.match.url + '/:postId'} exact component={FullPost} />
			<section className="Posts">
                {posts}
            </section>
            
        </div>
		);
	
}

const mapStateToProps = state => {
    return {
        RedAuth: state.auth,
        RedPost: state.posts,
        RedError: state.error,
        RedLoad: state.load
    };
};

const mapDispatchToProps = dispatch => {
    return{
        RedDisStore: () => dispatch(actionCreators.getPost())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);				

				