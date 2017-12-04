import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../actions'

class Categories extends Component {
  // shouldComponentUpdate () {

  // }
  // componentDidMount () {
  //   const { actions, category } = this.props

  //   this.props.actions.getCategories()
  //   this.props.actions.getAllPosts()
  //   this.props.actions.filterCategory(category)
  //   // this.props.actions.getCategoriesPosts(this.props.selectedCategory)
  // }

  render () {
    const { categories, allPosts, selectedCategory, actions, categoriesPosts } = this.props
    return (
      <div>
        {/* <button onClick={() => actions.createNewPost()}>Create New Post</button> */}
        <Link 
          to="/create"
          onClick={() => window.scrollTo(0, 0)}
        >
          Create New Post
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
                  value={c.name}
                  onClick={(e) => actions.filterCategory(e.target.value)}
                >
                  {c.name}
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
          categoriesPosts.map((p, i) => (
            <li key={i}>
              <div>
                <ul>
                  <li>
                    <Link
                      key={p.id}
                      to={`/${p.category}/${p.id}`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {p.title}
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
    categoriesPosts: readableReducer.categoriesPosts
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)