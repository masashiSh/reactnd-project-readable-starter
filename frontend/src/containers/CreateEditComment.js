import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../actions'


class CreateEditComment extends Component {

  state = {
    body: '',
    author: '',
  }
  
  componentDidMount() {
    const { comment } = this.props
    if (Object.keys(comment).length > 0) {
      const { body, author } = comment
      this.setState({
        body: body,
        author: author,
      })
    }
  }
  // componentWillReceiveProps() {
  //   const { comment } = this.props
  //   if (Object.keys(comment).length > 0) {
  //     const { body, author } = comment
  //     this.setState({
  //       body: body,
  //       author: author,
  //     })
  //   }
  // }

  handlePostClicked () {
    const uuid = require('uuid/v4')()
    const timestamp = Date.now()
    
    this.props.actions.postComment(Object.assign({},
      this.state,
      {id: uuid},
      {timestamp: timestamp},
      {parentId: this.props.selectedPost.id}
    ))
  }
  
  handlePutClicked () {
    const timestamp = Date.now()
    this.props.actions.putComment(Object.assign({},
      {body: this.state.body},
      {timestamp: timestamp},
    ), this.props.comment.id)
  }

  render () {
    const {  action, comment, selectedPost } = this.props
    return (
      <div>
      <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
        >
          <button>Home</button>
        </Link>
        <h4>
          {
            Object.keys(comment). length > 0
              ? 'Edit a Comment'
              : 'Create a new Comment'
          }
        </h4>
        <ul>
          {
            'author,body'.split(',')
            .map(i => (
              <li key={i}>
                <label>{i}:</label>
                <input 
                  type="text" value={this.state[i]} 
                  onChange={(e) => this.setState({[i]: e.target.value})}
                  disabled={((Object.keys(comment).length > 0) && (i === 'author'))}
                />
              </li>
          ))}
          <li>
            <Link
              to={`/${selectedPost.category}/${selectedPost.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
            {
              Object.keys(comment). length > 0
                ? <button onClick={() => this.handlePutClicked()}>Put</button>
                : <button onClick={() => this.handlePostClicked()}>Post</button>
            }
            <button>Cancel</button>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}





const mapStateToProps = (state, props) => {
  const { readableReducer, router } = state
  return {
    comment: readableReducer.selectedComment,      // propsにして、
    selectedPost: readableReducer.selectedPost      // propsにして、
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEditComment)
