import * as types from '../constants/actionTypes'
const api = 'http://localhost:3001'

export const getCategories = () => dispatch => (
  fetch(
    `${api}/categories`, {
      headers: {
        'Authorization': 'whatever-you-want'
      },
      method: 'GET'
    }
  ).then(res => res.json()
    .then(json => dispatch({
      type: types.GET_CATEGORIES,
      data: json
    }))
  ).catch(() => console.log('err'))
)

export const getAllPosts = () => dispatch => (
  fetch(
    `${api}/posts`, {
      headers: {
        'Authorization': 'whatever-you-want'
      },
      method: 'GET'
    }
  ).then(res => res.json()
    .then(json => dispatch({
      type: types.GET_ALL_POSTS,
      data: json
    }))
  ).catch(() => console.log('err'))
)

// export const filterCategory = (category) => dispatch => (
export const filterCategory = (category) => ({
  // fetch(
  //   `${api}/${category}/posts`, {
  //     headers: {
  //       'Authorization': 'whatever-you-want'
  //     },
  //     method: 'GET'
  //   }
  // ).then(res => res.json()
  //   .then(json => dispatch({
      type: types.FILTER_CATEGORY,
      selectedCategory: category,
      // data: json
    // }))
  // ).catch(() => console.log('err'))
})

export const getCategoriesPosts = (category) => dispatch => (
  fetch(
    `${api}/${category}/posts`, {
      headers: {
        'Authorization': 'whatever-you-want'
      },
      method: 'GET'
    }
  ).then(res => res.json()
    .then(json => dispatch({
      type: types.GET_CATEGORIES_POSTS,
      // selectedCategory: category,
      data: json
    }))
  ).catch(() => console.log('err'))
)

export const createNewPost = () => ({
  type: types.CREATE_NEW_POST
})
export const selectPost = (postTitle) => ({
  type: types.SELECT_POST,
  postTitle
})
