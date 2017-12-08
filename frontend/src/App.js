import React, { Component } from 'react'
import './App.css'
import { Route, Switch } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Default from './containers/Default'
import Categories from './containers/Categories'
import CreateEdit from './containers/CreateEdit'
import CreateEditComment from './containers/CreateEditComment'
import PostDetail from './containers/PostDetail'
import NotFound from './containers/NotFound'

import * as actions from './actions'

class App extends Component {
  componentDidMount () {
    this.props.actions.getCategories()
  }

  render () {
    const { categories, categoriesPosts, allPosts, selectedCategory,
      selectedPost, selectedComment } = this.props
    return (
      <div>
        <Switch >
          <Route exact path="/" component={Default} />
          <Route
            path={`/create/post${(selectedPost.length > 0) ? selectedPost : ''}`}
            render={() => <CreateEdit categories={categories} />}
            post={selectedPost}
          />
          <Route
            path="/create/comment/new" component={CreateEditComment}
          />
          {
            (Object.keys(selectedComment).length > 0) &&
            <Route 
              path={`/create/comment/${selectedComment.id}`} component={CreateEditComment}
              comment={selectedComment}
            />
          }
          { (selectedPost) &&
              <Route
                path={`/${selectedPost.category}/${selectedPost.id}`}
                component={PostDetail}
                key={selectedPost.id}
              />
          }
          {
            categories.map(c => (
              <Route
                key={c.name}
                path={'/' + c.name}
                render={() => (
                  <Categories selectedCategory={c.name} />
                )}
              />

            ))
          }
          <Route path='*' component={NotFound} />
        </Switch>
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
    selectedComment: readableReducer.selectedComment,
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
