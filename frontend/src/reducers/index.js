import { mode, sort } from '../constants/'
import * as types from '../constants/actionTypes'

const initialState = {
  mode: mode.DEFAULT,
  categories: [],
  allPosts: [],
  categoriesPosts: [],
  selectedPost: '',
  // sortOrder: '',
  sortOrder: sort.DEFAULT,
  selectedPostComments: [],
  selectedComment: {},
  selectedCategory: ''
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
        {
          mode: mode.CREATE_POST,
          selectedPost: initialState.selectedPost,
          selectedPostComments: initialState.selectedPostComments
        }
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
        {
          selectedPost: state.allPosts.filter(p => p.id === action.postId)[0],
          selectedPostComments: action.data
        }
      )
    case types.SELECT_POST_EDIT:
      return Object.assign({},
        state,
        {
          selectedPost: state.allPosts.filter(p => p.id === action.postId)[0]
          // selectedPostComments: action.data
        }
      )
    case types.SELECT_COMMENT:
      return Object.assign({},
        state,
        {
          selectedComment: state.selectedPostComments.filter(c => c.id === action.commentId)[0]
          // selectedComment: action.data
        }
      )
    case types.CREATE_NEW_COMMENT:
      return Object.assign({},
        state,
        {
          selectedComment: {}
          // selectedComment: action.data
        }
      )
    case types.SORT_POSTS:
      return Object.assign({},
        state,
        { sortOrder: action.sort }
      )
    case types.POST_CONTENT:
      return Object.assign({},
        state,
        {
          // allPosts: Object.assign([], state.allPosts, action.addedPost)
          allPosts: [...state.allPosts, action.addedPost]
        }
      )
    case types.PUT_CONTENT:
      return Object.assign({},
        state,
        {
          // allPosts: Object.assign({}, state.allPosts, action.addedPost),
          allPosts: state.allPosts.filter(p => p.id !== action.addedPost.id).concat([action.addedPost])
          
          // selectedPost: action.addedPost
        }
      )
    case types.DELETE_POST:
      return Object.assign({},
        state,
        {
          allPosts: state.allPosts.filter(p => p.id !== action.deletedPost.id),
          categoriesPosts: state.categoriesPosts.filter(p => p.id !== action.deletedPost.id),
          selectedPost: state.selectedPost
        }
      )
    case types.POST_COMMENT:
      // const nextCommentCount = state.allPosts.filter(p => p === action.parentId).commentCount + 1
      const nextAllPosts = state.allPosts.map(p => {
        if (p.id === action.parentId) {
          return (
            Object.assign({},
              {...p},
              {commentCount: p.commentCount + 1}
            )
          )
        }
        return p
      })
      return Object.assign({},
        state,
        {
          allPosts: nextAllPosts,
          selectedPostComments: state.selectedPostComments.concat(action.addedComment),
          // selectedComment: action.addedComment
          selectedPost: nextAllPosts.filter(p => p.id === action.addedComment.parentId)[0]
        }
      )
    case types.PUT_COMMENT:
      return Object.assign({},
        state,
        {
          // allPosts: Object.assign(state.allPosts, action.addedPost)
          selectedPostComments: state.selectedPostComments.map(c => (
            (c.id === action.addedComment.id)
              ? action.addedComment
              : c
          )),
          selectedComment: action.addedComment
        }
      )
    case types.DELETE_COMMENT:
      const nexAllPosts = state.allPosts.map(p => {
        if (p.id === action.deletedComment.parentId) {
          return (
            Object.assign({},
              {...p},
              {commentCount: p.commentCount - 1}
            )
          )
        }
        return p
      })
      return Object.assign({},
        state,
        {
          // allPosts: Object.assign(state.allPosts, action.addedPost)
          allPosts: nexAllPosts,
          selectedPostComments: state.selectedPostComments.filter(c => (
            (c.id !== action.deletedComment.id)
          )),
          selectedComment: initialState.selectedComment,
          selectedPost: nexAllPosts.filter(p => p.id === action.deletedComment.parentId)[0]
          
        }
      )
    case types.VOTE_POST:
      return Object.assign({},
        state,
        {
          allPosts: state.allPosts.map(p => (p.id === action.votedPost.id) ? action.votedPost : p),
          selectedPost: (state.selectedPost.id === action.votedPost.id) ? action.votedPost : state.selectedPost
        }
      )
    case types.VOTE_COMMENT:
      return Object.assign({},
        state,
        {
          selectedPostComments: state.selectedPostComments.map(c => (
            (c.id === action.votedComment.id)
              ? action.votedComment
              : c
          ))
        }
      )

    default:
      return state
  }
}

export default readableReducer
