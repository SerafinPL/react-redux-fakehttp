import React, {Component} from 'react';

//import axiosInstance from '../../../axios';

import Post from '../../../components/Post/Post';
import './Posts.css';
import { Link, Route } from 'react-router-dom'
import FullPost from '../FullPost/FullPost';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actionCreators';


class Posts extends Component{


	state = {
        posts: [],
        error: null,
        load: true
        
    }


    componentDidMount(){
        console.log(this.props);
        this.props.RedDisStore();
    // axiosInstance.get('/posts')
    // .then(response => {
    //     const posts = response.data.slice(0, 5);
    //     const updatedPosts = posts.map(post => {
    //         return {
    //             ...post,
    //             author: 'Kuba'
    //         }
    //     });
    //     this.setState({
    //         posts: updatedPosts,
    //         load: true
    //     })
    //     //console.log(response);
    // })
    // .catch(error => {
    //     // handle error
    //     console.log(error);
    //     this.setState({error: true})
    // });
    }

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/' + id);

    }

	render(){

		let posts = <p style={{textAlign : 'center'}}>Ładowanie postów</p>

        if (this.props.RedError) {posts = <p style={{textAlign : 'center'}}>Coś jest nie tak pojawił się ERROR</p>};

        if (!this.props.RedError && this.props.RedLoad){
            posts = this.props.RedPost.map(post => {
                return( 
                    <Post 
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                );//return
            });//map
        }; //if


		return(
            <div>
                <Route path={this.props.match.url + '/:postId'} exact component={FullPost} />
				<section className="Posts">
                    {posts}
                </section>
                
            </div>
			);
	}
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

				