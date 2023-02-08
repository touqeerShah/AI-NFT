"use client"; // this is a client component

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/page.module.css'
import {Web3Provider } from "@ethersproject/providers"
import Head from 'next/head'
import { useCallback, useEffect, useReducer } from 'react'
import Web3Modal from 'web3modal'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { getChainData } from '../../lib/utilities'
import {web3ModalSetup} from "../../lib/Web3ModalSetup"
import Header from "../components/header"
 import NFTCreator from "../components/nft-creation"
const inter = Inter({ subsets: ['latin'] })

let web3Modal:Web3Modal|null;
let chainData:any;
type StateType = {
  provider?: any
  web3Provider?: any
  address?: string
  chainId?: number
}

type ActionType =
  | {
      type: 'SET_WEB3_PROVIDER'
      provider?: StateType['provider']
      web3Provider?: StateType['web3Provider']
      address?: StateType['address']
      chainId?: StateType['chainId']
    }
  | {
      type: 'SET_ADDRESS'
      address?: StateType['address']
    }
  | {
      type: 'SET_CHAIN_ID'
      chainId?: StateType['chainId']
    }
  | {
      type: 'RESET_WEB3_PROVIDER'
    }

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address:undefined,
  chainId:undefined,
}

function reducer(state: StateType, action: ActionType): StateType {
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
      throw new Error()
  }
}
export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state

  const connect = useCallback(async function () {
    console.log("start");
    
      // This is the initial `provider` that is returned when
      // using web3Modal to connect. Can be MetaMask or WalletConnect.
      const provider = await web3Modal?.connect()
      // We plug the initial `provider` into ethers.js and get back
      // a Web3Provider. This will add on methods from ethers.js and
      // event listeners such as `.on()` will be different.
      const web3Provider = new Web3Provider(provider)

      const signer = web3Provider.getSigner()
      const address = await signer.getAddress()

      const network = await web3Provider.getNetwork()
      console.log("network.chainId",network.chainId);
      
      dispatch({
        type: 'SET_WEB3_PROVIDER',
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      })
      chainData = getChainData(network.chainId)
      console.log("end");


  }, [])

  const disconnect = useCallback(
    async function () {
      await web3Modal?.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider]
  )

  // Auto connect to the cached provider
  useEffect(() => {
    web3Modal= web3ModalSetup();
  }, [])
  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connect()
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])


  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Header 
        web3Provider={web3Provider}
        connect={connect}
        disconnect={disconnect}
        address={address}
        chainData={chainData}
        />
      </div>
      <div className={styles.center}>

      <NFTCreator
              web3Provider={web3Provider}
              chainId={chainId}
              address={address}

      />
      <ToastContainer />

      </div>
    </main>
  )
}
