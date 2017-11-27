import { mode } from '../constants/index'
import * as types from '../constants/actionTypes'

const initialState = {
  mode: mode.DEFAULT
}

function readableReducer (state = initialState, action) {
  switch (action.type) {
    // case types.CREATE_NEW_POST:
    // const 
      // reutrn ;



    default:
      return state
  }
}

export default readableReducer
