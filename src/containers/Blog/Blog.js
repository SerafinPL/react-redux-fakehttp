import React, { Component } from 'react';
 
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

import Posts from './Posts/Posts';
//import FullPost from './FullPost/FullPost';
import './Blog.css';

//import axios from 'axios';
import axiosInstance from '../../axios';

//import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});




const Blog = (props) => {

    return (
        <div className="Blog">
            <header>
                <nav>
                    <ul>
                        <li><NavLink 
                                to='/posts/'
                                activeClassName='my-active'
                                activeStyle={{
                                     fontSize: '1.5em'
                                }}
                            >Home</NavLink>
                        </li>
                        {props.RedAuth ? 
                            (<li><NavLink 
                                    to='/new-post'
                                    activeClassName='my-active'
                                    activeStyle={{fontSize: '1.5em'}}
                                >NewPost</NavLink>
                            </li>)  
                            : null
                        }
                    </ul>
                </nav>
            </header>
                        
            <Switch> 
                {props.RedAuth ? (<Route path='/new-post' component={AsyncNewPost} />) : null}

                <Route path='/posts' component={Posts} />
                <Redirect from='/' to='/posts' exact />
                <Route render={() => <h1>Nie znaleziono strony</h1>} /> {/* bez path łapie wszystkie ścieszki dla 404error*/}
                
            </Switch>
            
            
        </div>
    );
    
}

const mapStateToProps = state => {
    return {
        RedAuth: state.auth
    };
};

export default connect(mapStateToProps)(Blog);