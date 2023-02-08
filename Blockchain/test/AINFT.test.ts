const { expect } = require('chai');
const { ethers } = require('hardhat');
import { BigNumber, Signer } from "ethers";
import { AINFT, } from "../typechain-types";
import { IPFS_SIMPLE, FEE } from "../helper-hardhat-config"
import { getAINFT } from "../instructions"


describe('NFT', () => {
  let deployer: Signer;
  let minter: Signer
  let deployerAddress: string;
  let minterAddress: string
  let ai_nft: AINFT


  beforeEach(async () => {
    // Setup accounts
    [deployer, minter] = await ethers.getSigners()

    // Deploy Real Estate
    ai_nft = await getAINFT()

    // Mint 
    const transaction = await ai_nft.connect(minter).mint(IPFS_SIMPLE, { value: FEE })
    await transaction.wait()
    deployerAddress = await deployer.getAddress();
    minterAddress = await minter.getAddress();
  })

  describe('Deployment', () => {
    it('Returns owner', async () => {
      const result = await ai_nft.owner()
      console.log(result);

      expect(result).to.be.equal(deployerAddress)
    })

    it('Returns cost', async () => {
      const result = await ai_nft.cost()
      expect(result).to.be.equal(FEE)
    })
  })

  describe('Minting', () => {
    it('Returns owner', async () => {
      const result = await ai_nft.ownerOf("1")
      expect(result).to.be.equal(minterAddress)
    })

    it('Returns URI', async () => {
      const result = await ai_nft.tokenURI("1")
      expect(result).to.be.equal(IPFS_SIMPLE)
    })

    it('Updates total supply', async () => {
      const result = await ai_nft.totalSupply()
      console.log("result", result);

      expect(result).to.be.equal("5")
    })
  })

  describe('Withdrawing', () => {
    let balanceBefore: string

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployerAddress)

      const transaction = await ai_nft.connect(deployer).withdraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      const result = await ethers.provider.getBalance(deployerAddress)
      expect(result).to.be.greaterThan(balanceBefore)
    })

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(ai_nft.address)
      expect(result).to.equal(0)
    })
  })
})