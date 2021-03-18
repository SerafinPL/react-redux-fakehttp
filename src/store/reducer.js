import * as actionTypes from './actionTypes';

const initialState ={
	auth: true,
	posts: [],
	loaded:false

};

const reducer = (state = initialState, action) => {

	switch (action.type){
		case actionTypes.STORE_RESULT:{
			if (!state.loaded){
				return {
					...state,
					posts: state.posts.concat(action.result),
					loaded : true
				}
			} else { return state; }
			
		}
	}

	return state;	
}

export default reducer;