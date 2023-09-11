import { DISCOVER_TYPES } from '../actions/discoverAction'

const initialState = {
	loading: false,
	posts: [],
	count: 0,
	page: 0,
	firstLoad: false
}

const discoverReducer = (state = initialState, action) => {
	switch (action.type) {
		case DISCOVER_TYPES.LOADING:
			return {
				...state,
				loading: action.payload
			}
		case DISCOVER_TYPES.GET_POSTS:
			return {
				...state,
				posts: action.payload.posts,
				count: action.payload.count,
				firstLoad: true
			}
		case DISCOVER_TYPES.UPDATE_POST:
			return {
				...state,
				posts: action.payload.posts,
				count: action.payload.count,
				page: state.page + 1
			}
		default:
			return state
	}
}

export default discoverReducer
