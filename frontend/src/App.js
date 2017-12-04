import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Default from './containers/Default'
import Categories from './containers/Categories'
import CreateEdit from './containers/CreateEdit'
import PostDetail from './containers/PostDetail'

import * as actions from './actions'

class App extends Component {
  render () {
    const { categories, categoriesPosts, allPosts, selectedCategory,
    selectedPost } = this.props
    return (
      <div>
        <Route exact path="/" component={Default} />
        <Route exact path="/create" component={CreateEdit} />
        {/* { 
          allPosts.map(p => (
            <Route
              exact path={`/${p.category}/${p.id}`}
              component={PostDetail}
              key={p.id}
              post={p}
            />
          ))
        } */}
        { (selectedPost) &&
            <Route
              exact path={`/${selectedPost.category}/${selectedPost.id}`}
              component={PostDetail}
              key={selectedPost.id}
            />
        }
        {/* { (categoriesPosts.length > 0) &&
          categories.map((c, i) => (
            <Route
              exact path={`/${c.path}`}
              component={Categories}
              key={c.path + 'posts' + i}
              category={selectedCategory}
              categoriesPosts={categoriesPosts}
            />
          ))
        } */}
        <Route
          exact path={'/' + selectedCategory}
          component={Categories}
          category={selectedCategory}
          categoriesPosts={categoriesPosts}
        />

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
    categoriesPosts: readableReducer.categoriesPosts,
    selectedPost: readableReducer.selectedPost,
    route: router.location.pathname
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)