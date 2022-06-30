import { combineReducers } from 'redux'
import {web3} from './reducers';

export default function rootReducer() {
  return combineReducers({
    web3
  })
}