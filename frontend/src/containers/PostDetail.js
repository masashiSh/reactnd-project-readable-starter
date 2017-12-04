import React, { Component } from 'react'
import { Route } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as actions from '../actions'

class App extends Component {
  render () {
    const { post } = this.props
    return (
      <div>
        {post.title}
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
