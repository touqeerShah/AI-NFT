import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../instructions/verify-code"
import { networkConfig, developmentChains, contractAddressFile, NFT_NAME, NFT_SYMBOL, FEE } from "../helper-hardhat-config"
import { ethers } from "hardhat"
import { storeProposalId } from "../utils/storeContractAddress"

const deployAINFT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let { network, deployments, getNamedAccounts } = hre
    let { deploy, log } = deployments
    let { deployer } = await getNamedAccounts();

    // const AINFT = await deploy("AINFT", {
    //     from: deployer,
    //     args: [NFT_NAME, NFT_SYMBOL, FEE],
    //     log: true,
    //     // we need to wait if on a live network so we can verify properly
    //     waitConfirmations: networkConfig[network.name].blockConfirmations || 1,

    // })

    // await storeProposalId(AINFT.address, "AINFT", contractAddressFile)

    // log(`AINFT at ${AINFT.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCANAPIKEY) {
        await verify("0x14fA186e1c28affB75D3aE4899491168F52c0A66", [NFT_NAME, NFT_SYMBOL, FEE])
    }

}

export default deployAINFT
deployAINFT.tags = ["all"];