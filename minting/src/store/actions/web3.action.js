import { web3Constants } from "../constants";

export const setWeb3Provider = (provider, web3Provider, address, chainId) => {
    return {
        type: web3Constants.SET_WEB3_PROVIDER,
        provider,
        web3Provider,
        address,
        chainId
    };
}

export const resetWeb3Provider = () => {
    return {
        type: web3Constants.RESET_WEB3_PROVIDER,
    }
}

export const setAddress = (address) => {
    return {
        type: web3Constants.SET_ADDRESS,
        address,
    }
}

export const setChainId = (chainId) => {
    return {
        type: web3Constants.SET_CHAIN_ID,
        chainId
    }
}

export const getMintPrice = () => {
    return {
        type: web3Constants.GET_MINT_PRICE
    }
}