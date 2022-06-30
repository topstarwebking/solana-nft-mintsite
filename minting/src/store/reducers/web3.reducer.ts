import {ActionType, StateType} from '../../lib/types';

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: undefined,
  chainId: undefined,
}

export function web3(state: StateType=initialState, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      return initialState;
  }
}

export const getProvider = (state:any) => {
  return state.web3.provider;
}
export const getWeb3Provider = (state: any) => {
  return state.web3.web3Provider;
}
export const getAddress = (state: any) => {
  return state.web3.address;
}
export const getChainId = (state: any) => {
  return state.web3.chainId;
}