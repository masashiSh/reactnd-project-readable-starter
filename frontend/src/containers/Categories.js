import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../actions'
import { sort } from '../constants/'

class Categories extends Component {
  componentDidMount () {
    const { actions } = this.props
    actions.getCategoriesPosts(this.props.selectedCategory)
    actions.getCategories()
    actions.getAllPosts()
  }
  
  render () {
    const { categories, allPosts, selectedCategory, actions, categoriesPosts, sortOrder } = this.props
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
          <button>Create New Post</button>
        </Link>
        {
          <ul>
            <h3>{`Current Category: ${selectedCategory}`}</h3>
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
            categoriesPosts.map((p, i) => (
              <li key={i}>
                <div>
                  <ul>
                    <li>
                      {'title: '}
                      <Link
                        key={p.id}
                        to={`/${p.category}/${p.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <button
                          key={p.id + 'button'}
                          value={p.id}
                          onClick={(e) => actions.selectPost(e.target.value)}
                        >
                          {p.title}
                        </button>
                      </Link>
                    </li>
                    <li>{`author: ${p.author}`}</li>
                    <li>{`number of comments: ${p.commentCount}`}</li>
                    <li>
                      {`current score: ${p.voteScore}`}
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
  const { readableReducer } = state
  const { selectedCategory } = props
  
  const tmpPosts = readableReducer.allPosts.slice()
    .filter(p => (p.category === selectedCategory))
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
    allPosts: readableReducer.allPosts,
    selectedCategory: selectedCategory,
    categoriesPosts: nextPosts,
    sortOrder: readableReducer.sortOrder
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
