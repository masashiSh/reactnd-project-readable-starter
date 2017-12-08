import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../actions'


class CreateEditPost extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: '',
  }
  componentDidMount() {
    // this.props.actions.getCategories()

    (this.props.categories[0]) && this.setState({category: this.props.categories[0].name})
    
    const { post } = this.props
    if (Object.keys(post).length > 0) {
      const {title, body, author, category } = post
      this.setState({
        title: title,
        body: body,
        author: author,
        category: category.name,
      })
    }
  }

  handlePostClicked () {
    const uuid = require('uuid/v4')()
    const timestamp = Date.now()
    
    this.props.actions.postContent(Object.assign({},
      this.state,
      {id: uuid},
      {timestamp: timestamp}
    ))
  }

  handlePutClicked () {
    this.props.actions.putContent(Object.assign({},
      {title: this.state.title},
      {body: this.state.body},
    ), this.props.post.id)
  }

  render () {
    const { categories, action, post } = this.props
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
            (post)
              ? 'Edit a Post'
              : 'Create a new Post'
          }
        </h4>
        <ul>
          {
            'category,title,author,body'.split(',')
            .filter(i => !(post) || (i === 'title') || (i === 'body'))
            .map(i => (
              (i === 'category')
              ? <li key={i}>
                  <label>{i}:</label>
                  <select value={this.state[i]} onChange={(e) => this.setState({[i]: e.target.value})}>
                    {
                      [''].concat(categories.map(c => c.name)).map(c => (
                        <option value={c} key={c}>{c}</option>
                      ))
                    }
                  </select>
                </li>
              : <li key={i}>
                  <label>{i}:</label>
                  <input type="text" value={this.state[i]} onChange={(e) => this.setState({[i]: e.target.value})} />
                </li>
          ))}
          <li>
            <Link
              to={'/'}
              onClick={() => window.scrollTo(0, 0)}
            >
              {
                (post)
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
    // categories: readableReducer.categories,
    categories: props.categories,
    post: readableReducer.selectedPost      // propsにして、
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEditPost)
