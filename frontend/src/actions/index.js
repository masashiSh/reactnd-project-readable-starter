import axios from 'axios'
import * as types from '../constants/actionTypes'
import { push } from 'react-router-redux'
const api = 'http://localhost:3001'

export const goLink = (url) => (
  push(url)
)

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

export const filterCategory = (category) => ({
  type: types.FILTER_CATEGORY,
  selectedCategory: category,
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
      data: json
    }))
  ).catch(() => console.log('err'))
)

export const createNewPost = () => ({
  type: types.CREATE_NEW_POST
})

export const sortPosts = (sort) => ({
  type: types.SORT_POSTS,
  sort
})

export const createNewComment = () => ({
  type: types.CREATE_NEW_COMMENT
})

export const selectPostEdit = (postId) => ({
  type: types.SELECT_POST_EDIT,
  postId: postId
})
export const selectPost = (postId) => dispatch => (
  fetch(
    `${api}/posts/${postId}/comments`, {
      headers: {
        'Authorization': 'whatever-you-want'
      },
      method: 'GET'
    }
  ).then(res => res.json()
    .then(json => dispatch({
      type: types.SELECT_POST,
      postId: postId,
      data: json
    }))
  ).catch(() => console.log('err'))
)

export const selectComment = (commentId) => dispatch => (
  fetch(
    `${api}/comments/${commentId}`, {
      headers: {
        'Authorization': 'whatever-you-want'
      },
      method: 'GET'
    }
  ).then(res => res.json()
    .then(json => dispatch({
      type: types.SELECT_COMMENT,
      commentId: commentId,
      data: json
    }))
  ).catch(() => console.log('err'))
)

export const postContent = (post) => (dispatch) => (
  axios.create({
    baseURL: `${api}`,
    headers: { Authorization: 'whatever-you-want' }
  }).post('/posts', post
  ).then(res => dispatch({
    type: types.POST_CONTENT,
    addedPost: res.data
  }))
)

export const putContent = (put, id) => (dispatch) => (
  axios.create({
    baseURL: `${api}`,
    headers: { Authorization: 'whatever-you-want' }
  }).put(`/posts/${id}`, put
  ).then(res => dispatch({
    type: types.PUT_CONTENT,
    addedPost: res.data
  }))
)

export const deletePost = (id) => (dispatch) => (
  axios.create({
    baseURL: `${api}`,
    headers: { Authorization: 'whatever-you-want' }
  }).delete(`/posts/${id}`
  ).then(res => dispatch({
    type: types.DELETE_POST,
    deletedPost: res.data
  }))
)

export const postComment = (post) => (dispatch) => (
  axios.create({
    baseURL: `${api}`,
    headers: { Authorization: 'whatever-you-want' }
  }).post('/comments', post
  ).then(res => dispatch({
    type: types.POST_COMMENT,
    addedComment: res.data,
    parentId: res.data.parentId
  }))
)

export const putComment = (put, id) => (dispatch) => (
  axios.create({
    baseURL: `${api}`,
    headers: { Authorization: 'whatever-you-want' }
  }).put(`/comments/${id}`, put
  ).then(res => dispatch({
    type: types.PUT_COMMENT,
    addedComment: res.data
  }))
)

export const deleteComment = (id) => (dispatch) => (
  axios.create({
    baseURL: `${api}`,
    headers: { Authorization: 'whatever-you-want' }
  }).delete(`/comments/${id}`
  ).then(res => dispatch({
    type: types.DELETE_COMMENT,
    deletedComment: res.data
  }))
)
export const votePost = (id, upOrDown) => (dispatch) => (
  axios.create({
    baseURL: `${api}`,
    headers: { Authorization: 'whatever-you-want' }
  }).post(`/posts/${id}`, {option: upOrDown}
  ).then(res => dispatch({
    type: types.VOTE_POST,
    votedPost: res.data
  }))
)

export const voteComment = (id, upOrDown) => (dispatch) => (
  axios.create({
    baseURL: `${api}`,
    headers: { Authorization: 'whatever-you-want' }
  }).post(`/comments/${id}`, {option: upOrDown}
  ).then(res => dispatch({
    type: types.VOTE_COMMENT,
    votedComment: res.data
  }))
)

