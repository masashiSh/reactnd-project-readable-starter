import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'
import Modal from 'react-modal'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import Loading from 'react-loading'

import * as actions from './actions/'


class Default extends Component() {
  render() {
    return <div></div>
  }
}


function mapDispatchToProps()

export default connect(
  mapStateToProps,
  mapDispatchToProps
)