"use client"; // this is a client component

import styles from '../styles/header.module.css'
import { create } from "ipfs-http-client";
import { Buffer } from 'buffer';
import axios from 'axios';
import { toast } from "react-toastify";

import { ethers,parseEther } from 'ethers';
import {
  HUGGING_FACE_API_KEY,
  ABI_AI_NFT,
  INFURA_URL,
  INFURA_IPFS_PROJECJECT_ID,
  CONTRACT_ADDRESS,
  CHAIN_ID,
  INFURA_IPFS_PROJECJECT_SECRET} from "./../../lib/config"
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
// import { create } from 'ipfs-client'

export default function NFTCreator(props:any) {
  const projectIdAndSecret = `${INFURA_IPFS_PROJECJECT_ID}:${INFURA_IPFS_PROJECJECT_SECRET}`;
  const client = create({
    host: INFURA_URL,
    port: 5001,
    protocol: "https",
    headers: {
      authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
        "base64"
      )}`,
    },
  });
  
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("null")
  const [imageData, setImageData] = useState("")

  const [url, setURL] = useState("")

  const [message, setMessage] = useState("")
  const [isWaiting, setIsWaiting] = useState(false)

  const loadBlockchainData = async () => {
    setNFT(ABI_AI_NFT)
  }

  const submitHandler = async (e:any) => {
    e.preventDefault()
    console.log("props.address",props.address);

    if(!props.address){
      console.log("props.address",props.address);

      toast.error("Connect Your wallet First Network")
      return;
    }
    if (name === "" || description === "") {
      window.alert("Please provide a name and description")
      return
    }

    setIsWaiting(true)
    
    // Call AI API to generate a image based on description
    const imageData = await createImage()
    setImageData(imageData)
    // Upload image to IPFS (NFT.Storage)
    // const url = await uploadImage(imageData)

    // Mint NFT
    // await mintImage(url)

    setIsWaiting(false)
    setMessage("")
  }

  const createImage = async () => {
    setMessage("Generating Image...")

    // You can replace this with different model API's
    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`

    // Send the request
    const response = await axios({
      url: URL,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        inputs: description, options: { wait_for_model: true },
      }),
      responseType: 'arraybuffer',
    })

    const type = response.headers['content-type']
    const data = response.data

    const base64data = Buffer.from(data).toString('base64')
    const img:string = `data:${type};base64,` + base64data // <-- This is so we can render it on the page
    setImage(img)

    return data
  }

  const mintNFT = async () => {
   try {
    const url = await uploadImage(imageData)
    if(url===""){
      return;
    }
    // Mint NFT
    await mintImage(url)
   } catch (error) {
      console.log(error);
      
   }
    
  }
  const uploadImage = async (imageData:any) => {
    setMessage("Uploading Image...")
    console.log("props?.chainData?.chainId!",props?.chainId);
    
    if(props?.chainId!=CHAIN_ID){
      toast.error("Invalid Network")
      return "";
    }
    let imagePath=''
    try {
      const added = await client.add(imageData);
      imagePath =  `https://ipfs.io/ipfs/${added.path}`;
    } catch (error) {
      toast.error("something is wrong with IPFS")
      return "";
    }
    let imageObject=JSON.stringify({
      image: imagePath,
      name: name,
      description: description,
    })
    let url:string =""
    // Create instance to NFT.Storage
    try {
      const added = await client.add(imageObject);
      // ipfs = `${INFURA_GATEWAY_URL}${added.path}`;
       url = `https://ipfs.io/ipfs/${added.path}`
      setURL(url)
    } catch (error) {
      toast.error("something is wrong with IPFS")
      return "";
    }
 
    return url
  }

  const mintImage = async (tokenURI:string) => {
    setMessage("Waiting for Mint...")
 try {   const signer = await props.web3Provider.getSigner();

    // const signer = await provider.getSigner()
    let aiNFT = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI_AI_NFT,
      signer
    );
    let price = ethers.parseEther("0.1");

    const transaction = await aiNFT.mint(tokenURI, { value: price }).then(async (tx)=>{
      await tx.wait()
      toast.success("Your NFT is minted")
      setImage("")
      setName("")
      setDescription("")
      // console.log("tx",tx);
    })
    
    
   }
    catch (error) {
      toast.error("something is wrong with contract")

    }
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])
  return (
  <>
    <div className='form'>
        <form onSubmit={submitHandler} >
          <input type="text" placeholder="Create a name..." onChange={(e) => { setName(e.target.value) }} />
          <input type="text" placeholder="Create a description..." onChange={(e) => setDescription(e.target.value)} />
          {/* <input type="submit" value="Create & Mint" />
          <input type="submit" value="Create & Mint" /> */}
          <div className='buttonAligment'>
            <button className="button_6" onClick={submitHandler} >Generate NFT</button>
            {imageData&&<button className="button_6"  onClick={mintNFT}>Mint NFT</button>}
          </div>
        </form>
   

        <div className="image">
          {!isWaiting && image ? (
            <img src={image} alt="AI generated image" />
          ) : isWaiting ? (
            <div className="image__placeholder">
              <Spinner style={{color:"white"}} animation="border" />
              <p>{message}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* {!isWaiting && url && (
        <p>
          View&nbsp;<a href={url} target="_blank" rel="noreferrer">Metadata</a>
        </p>
      )} */}
</>
  );
}
