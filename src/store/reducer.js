import * as actionTypes from './actionTypes';

const initialState ={
	auth: true,
	posts: [],
	loaded:false,
	error: null,
	load: false

};

const reducer = (state = initialState, action) => {

	switch (action.type){
		case actionTypes.STORE_RESULT:{
			if (!state.loaded && !action.error){
				return {
					...state,
					posts: state.posts.concat(action.result),
					loaded : true,
					load: true
				}
			} else if (action.error) {
				return {
					...state,
					loaded : false,
					error: true,
					load: true
				}
			} else { return state; }
			
		}
	}

	return state;	
}

export default reducer;