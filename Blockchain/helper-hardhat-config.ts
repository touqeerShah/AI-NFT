import { ethers } from "hardhat"

export interface networkConfigItem {
    ethUsdPriceFeed?: string
    blockConfirmations?: number
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    localhost: {},
    hardhat: {},
    goerli: {
        blockConfirmations: 5
    },
}


export const developmentChains = ["hardhat", "localhost"]
export const proposalsFile = "proposals.json"
export const contractAddressFile = "config/contractAddress.json"
export const NFT_NAME = "AI-NFT"
export const NFT_SYMBOL = "786"
export const IPFS_SIMPLE = process.env.IPFS_SIMPLE || ""
export const REACT_APP_IPFS_KEY = process.env.REACT_APP_IPFS_KEY || ""
export const REACT_APP_HUGGIMG_FACE = process.env.REACT_APP_HUGGIMG_FACE || ""
export const FEE = ethers.utils.parseEther("0.1")