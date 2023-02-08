# AI-NFT

This simple program to call AI Platform API to generate Random Image to Create NFT of it

### Usercase

This is simple example of AI API and ERC721 you can used any of them and used this simple example

- [Hardhat Upgrades](#hardhat-upgrades)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quickstart](#quickstart)
  - [Typescript](#typescript)
    - [Optional Gitpod](#optional-gitpod)
- [Usage](#usage)
  - [Testing](#testing)
    - [Test Coverage](#test-coverage)
- [Deployment to a testnet or mainnet](#deployment-to-a-testnet-or-mainnet)
  - [Scripts](#scripts)
  - [Estimate gas](#estimate-gas)
    - [Estimate gas cost in USD](#estimate-gas-cost-in-usd)
  - [Verify on etherscan](#verify-on-etherscan)
- [Linting](#linting)
- [Formatting](#formatting)
- [Thank you!](#thank-you)

# Getting Started

## Deployed Contract Address

## Requirements

- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node --version` and get an ouput like: `vx.x.x`
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - `yarn --version` and get an output like: `x.x.x`
    - You might need to install it with npm
- [Hugging Face](https://huggingface.co/)
  - We used this platform to like with AI tool which are available in market
  - You need to create Account and get access token to connect with API
- [Infure](https://www.infura.io/)
  - You need infure Provider key and IPFS keys to connnect with network and IPFS to upload metatdata

## Quickstart

Environmet For Blockchain

```
PRIVATE_KEY_0=930c8ca5aee92adf5286adff44fff95425a7f414bfdaab24af56d84d4f0553e6
INFURA_API_KEY=""
ETHERSCANAPIKEY=""
```

Environmet For UI

```
NEXT_PUBLIC_INFURA_ID="
NEXT_PUBLIC_INFURA_IPFS_PROJECJECT_ID=""
NEXT_PUBLIC_INFURA_IPFS_PROJECJECT_SECRET=""
NEXT_PUBLIC_HUGGING_FACE_API_KEY=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
NEXT_PUBLIC_IINFURA_URL="ipfs.infura.io"
NEXT_PUBLIC_CONTRACT_ADDRESS=""
NEXT_PUBLIC_CHAIN_ID=5
NEXT_PUBLIC_NFT_STORAGE=""

```

## First go to Blockchain Folder

Install Modules :

```
npm i
```

Deploy Contract

```
# if local first run node
hh node
# import account into Wallet

hh deploy --network localhost

# Deploy on testnet
hh deploy --network goerli
```

# Frontend

1. first

```
cd UI
```

2. Install module

```
npm i
```

3. Run Frontend

```
npm run dev
```

# Deployment to a testnet or mainnet

1. Setup environment variabltes

You'll want to set your `GOERLI_RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file, similar to what you see in `.env.example`.

- `PRIVATE_KEY`: The private key of your account (like from [metamask](https://metamask.io/)). **NOTE:** FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
  - You can [learn how to export it here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- `GOERLI_RPC_URL`: This is url of the goerli testnet node you're working with. You can get setup with one for free from [Alchemy](https://alchemy.com/?a=673c802981) or [Infura](https://www.infura.io/)

2. Get testnet ETH

Head over to [Alchemy](https://goerlifaucet.com/) and get some tesnet ETH. You should see the ETH show up in your metamask.

3. Deploy

```
yarn hardhat deploy --network goerli
```

## Staging Testing

After deploy to a testnet or local net, you can run staging test.

```
yarn run test:staging
```

## Estimate gas

You can estimate how much gas things cost by running:

```
yarn hardhat test
```

And you'll see and output file called `gas-report.txt`

### Estimate gas cost in USD

To get a USD estimation of gas cost, you'll need a `COINMARKETCAP_API_KEY` environment variable. You can get one for free from [CoinMarketCap](https://pro.coinmarketcap.com/signup).

Then, uncomment the line `coinmarketcap: COINMARKETCAP_API_KEY,` in `hardhat.config.js` to get the USD estimation. Just note, everytime you run your tests it will use an API call, so it might make sense to have using coinmarketcap disabled until you need it. You can disable it by just commenting the line back out.

## Verify on etherscan

If you deploy to a testnet or mainnet, you can verify it if you get an [API Key](https://etherscan.io/myapikey) from Etherscan and set it as an environemnt variable named `ETHERSCAN_API_KEY`. You can pop it into your `.env` file as seen in the `.env.example`.

In it's current state, if you have your api key set, it will auto verify goerli contracts!

However, you can manual verify with:

```
yarn hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
```

Or when you Run you Deploy it will automatical verify the conteact when it was on testnet

# Linting

To check linting / code formatting:

```
yarn lint
```

or, to fix:

```
yarn lint:fix
```

Contract Address Testnet

```
AINFT = 0x14fA186e1c28affB75D3aE4899491168F52c0A66
```

# Thank you!

[![Touqeer Medium](https://img.shields.io/badge/Medium-000000?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@touqeershah32)
[![Touqeer YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UC3oUDpfMOBefugPp4GADyUQ)
[![Touqeer Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/touqeer-shah/)
