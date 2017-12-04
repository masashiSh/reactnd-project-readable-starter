import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../actions'

class Default extends Component {
  componentDidMount () {
    this.props.actions.getCategories()
    this.props.actions.getAllPosts()
  }

  render () {
    const { categories, allPosts, selectedCategory, actions } = this.props
    return (
      <div>
        {/* <button onClick={() => actions.createNewPost()}>Create New Post</button> */}
        <Link 
          to="/create"
          onClick={() => window.scrollTo(0, 0)}
        >
          Create New Post
        </Link>
        { (categories.length > 0) &&
        <ul>
          <h4>Select Category</h4>
          {
            categories.map((c, i) => (
              <li key={c.name + i}>
                <Link
                  to={`${c.path}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <button
                    value={c.path}
                    onClick={(e) => actions.filterCategory(e.target.value)}
                  >
                    {c.name}
                  </button>
                </Link>
              </li>
            ))
          }
        </ul>
        }
        { (allPosts.length > 0) &&
        <ul>
          <h4>Posts</h4>
          {
            allPosts.map((p, i) => (
              <li key={i}>
                <div>
                  <ul>
                    <li>
                      <Link
                        key={p.id}
                        to={`/${p.category}/${p.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <button
                          key={p.id + 'button'}
                          value={p.title}
                          onClick={(e) => actions.selectPost(e.target.value)}
                        >
                          {p.title}
                        </button>
                      </Link>
                    </li>
                    <li>{`author: ${p.author}`}</li>
                    <li>{`number of comments: ${p.commentCount}`}</li>
                    <li>{`current score: ${p.voteScore}`}</li>
                    <li>
                      <button>Up</button>
                      <button>Down</button>
                    </li>
                  </ul>
                  
                </div>
              </li>
            ))
          }
        </ul>
        }
      </div>
    )
  }
}


const mapStateToProps = (state, props) => {
  const { readableReducer, router } = state
  return {
    categories: readableReducer.categories,
    allPosts: readableReducer.allPosts,
    selectedCategory: readableReducer.selectedCategory,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Default)