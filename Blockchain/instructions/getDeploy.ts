import { BigNumber } from "ethers";
import { artifacts, ethers } from "hardhat";
import { contractAddressFile } from "../helper-hardhat-config"
import * as fs from "fs";
import { AINFT } from "../typechain-types"


export async function getAINFT(): Promise<AINFT> {
  let contractAddress = JSON.parse(fs.readFileSync(contractAddressFile, "utf8"))
  let AINFT = await ethers.getContractAt("AINFT", contractAddress["AINFT"]);
  return AINFT;
}