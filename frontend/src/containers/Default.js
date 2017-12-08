import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../actions'
import { sort } from '../constants/'

class Default extends Component {
  componentDidMount () {
    this.props.actions.getCategories()
    this.props.actions.getAllPosts()
    this.props.actions.filterCategory('')
  }
  
  // componentWillReceiveProps () {
  //   this.props.actions.getCategories()
  //   this.props.actions.getAllPosts()
  // }
  
  
  render () {
    const { categories, allPosts, selectedCategory, actions, sortOrder } = this.props
    
    return (
      <div>
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
          <div>
            <ul>
              <li>Sort:
                <select value={sortOrder} onChange={(e) => actions.sortPosts(e.target.value)} >
                  {
                    Object.entries(sort).map(([k, v]) => (
                      <option key={k} value={v}>{v}</option>
                    ))
                  }
                </select>
              </li>
            </ul>
          </div>
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
                          value={p.id}
                          onClick={() => actions.selectPost(p.id)}
                        >
                          {p.title}
                        </button>
                      </Link>
                    </li>
                    <li>{`author: ${p.author}`}</li>
                    <li>{`number of comments: ${p.commentCount}`}</li>
                    <li>{`current score: ${p.voteScore}`}</li>
                    <li>
                      <button onClick={() => actions.votePost(p.id, 'upVote')}>Up</button>
                      <button onClick={() => actions.votePost(p.id, 'downVote')}>Down</button>
                    </li>
                    <li>
                      <Link
                        key={p.id}
                        to={`/create/post/${p.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <button
                          key={p.id + 'button'}
                          value={p.id}
                          onClick={(e) => actions.selectPost(e.target.value)}
                        >
                          {'Edit'}
                        </button>
                      </Link>
                      <button value={p.id} onClick={(e) => actions.deletePost(e.target.value)}>Delete</button>
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

  const tmpPosts = readableReducer.allPosts.slice()
  const sortOrder = readableReducer.sortOrder.slice()
  let nextPosts
  switch (sortOrder) {
    case sort.HIGH_SCORE:
      nextPosts = tmpPosts.sort((p, n) => {
        if (p.voteScore < n.voteScore) return  1
        if (p.voteScore > n.voteScore) return -1
        return 0
      })
      break
    case sort.LOW_SCORE:
      nextPosts = tmpPosts.sort((p, n) => {
        if (p.voteScore < n.voteScore) return -1
        if (p.voteScore > n.voteScore) return  1
        return 0
      })
      break
    case sort.NEW_POST:
      nextPosts = tmpPosts.sort((p, n) => {
        if (p.timestamp < n.timestamp) return 1
        if (p.timestamp > n.timestamp) return -1
        return 0
      })
      break
    case sort.OLD_POST:
      nextPosts = tmpPosts.sort((p, n) => {
        if (p.timestamp < n.timestamp) return -1
        if (p.timestamp > n.timestamp) return 1
        return 0
      })
      break
    default:
      nextPosts = tmpPosts
  }
  return {
    categories: readableReducer.categories,
    allPosts: nextPosts,
    selectedCategory: readableReducer.selectedCategory,
    sortOrder: readableReducer.sortOrder
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Default)