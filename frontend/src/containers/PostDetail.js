import React, { Component } from 'react'
import { Route } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../actions'

export const postOrder = 'title,commentCount,voteScore,body,comments'

class PostDetail extends Component {
  componentDidMount () {
    this.props.actions.getCategories()
  }

  render () {
    const { post, comments, actions, selectedCategory } = this.props
    return (
      <div>
      <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
        >
          <button>Home</button>
        </Link>
        <Link
          to="/create/post/new"
          onClick={() => window.scrollTo(0, 0)}
        >
          <button
            onClick={() => actions.createNewPost()}
          >
            Create a New Post
          </button>
        </Link>
        <h4>Post Detail</h4>
        <div>
          <h5>Post</h5>
          <ul>
            <li>{`title: ${post.title}`}</li>
            <li>{`body: ${post.body}`}</li>
            <li>{`author: ${post.author}`}</li>
            <li>{`number of comments: ${post.commentCount}`}</li>
            <li>{`date: ${new Date(post.timestamp)}`}</li>
            <li>
              {`score: ${post.voteScore}`}
              <button onClick={() => actions.votePost(post.id, 'upVote')}>Up</button>
              <button onClick={() => actions.votePost(post.id, 'downVote')}>Down</button>
            </li>
            <li>
              <Link
                to={`/create/post/${post.id}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <button>Edit</button>
              </Link>
              <Link
                to={
                  (selectedCategory).length > 0
                    ? `/${selectedCategory}`
                    : '/'
                }
                onClick={() => window.scrollTo(0, 0)}
              >
                <button
                  onClick={() => actions.deletePost(post.id)}
                >
                  Delte
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Comments</h5>
          <Link
            to={`/create/comment/new`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <button
              onClick={() => actions.createNewComment()}
            >
              Create a new comment
            </button>
          </Link>
          <ul>
            {
              comments.map((c, i) => (
                <li key={i}>
                  <ul>
                    <li>{`author: ${c.author}`}</li>
                    <li>{`body: ${c.body}`}</li>
                    <li>
                      {`score: ${c.voteScore}`}
                      <button onClick={() => actions.voteComment(c.id, 'upVote')}>Up</button>
                      <button onClick={() => actions.voteComment(c.id, 'downVote')}>Down</button>
                    </li>
                    <li>
                      <Link
                        to={`/create/comment/${c.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <button
                          value={c.id}
                          onClick={(e) => actions.selectComment(e.target.value)}
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => actions.deleteComment(c.id)}
                      >Delete</button>
                    </li>
                  </ul>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { readableReducer, router } = state
  return {
    categories: readableReducer.categories,
    allPosts: readableReducer.allPosts,
    post: readableReducer.selectedPost,
    comments: readableReducer.selectedPostComments,
    selectedCategory: readableReducer.selectedCategory,
    route: router.location.pathname
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
