import { mode } from '../constants/index'
import * as types from '../constants/actionTypes'

const initialState = {
  mode: mode.DEFAULT,
  categories: [],
  allPosts: [],
  categoriesPosts: [],
  selectedPost: ''
}

function readableReducer (state = initialState, action) {
  switch (action.type) {
    case types.GET_CATEGORIES:
      return Object.assign({},
        state,
        { categories: action.data.categories }
      )
    case types.GET_ALL_POSTS:
      return Object.assign({},
        state,
        { allPosts: action.data }
      )
    case types.CREATE_NEW_POST:
      return Object.assign({},
        state,
        { mode: mode.CREATE_POST }
      )
    case types.FILTER_CATEGORY:
      return Object.assign({},
        state,
        { selectedCategory: action.selectedCategory },
        { categoriesPosts: state.allPosts.filter(p => p.category === action.selectedCategory) }
      )
    case types.GET_CATEGORIES_POSTS:
      return Object.assign({},
        state,
        // { selectedCategory: action.selectedCategory },
        { categoriesPosts: action.data }
      )
    case types.SELECT_POST:
      return Object.assign({},
        state,
        // { selectedCategory: action.selectedCategory },
        { selectedPost: state.allPosts.filter(p => p.title === action.postTitle)[0] }
      )



    default:
      return state
  }
}

export default readableReducer
