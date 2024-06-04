"use client";
import React, { useState } from 'react';
import axios from 'axios'; 
import { ethers } from "ethers";
import abi from "../../../contracts/abi.json";
import { useContext } from "react";
import {MintContext} from '../../../contracts/interact'

const UploadNNFTtoIPFS: React.FC = () => {
    const [fileImg, setFileImg] = useState(null); 
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const { MintContract, currentAccount, setTokenID } = useContext(MintContext)
    const contractAddress = "0xc9Af3A414dE210ff45D09730360247cF10CafAaa"
    const contractABI = abi;
    // const { ethereum } = window;

        if (!MintContract) {
            return <div>Loading...</div>;
        }


    const mintNFT = async (tokenURI: any) => {
        try {
            await MintContract.safeMint(address, tokenURI)
            setMessage('Minting successful!');
            setLoading(false);
            setFileImg(null);
            setName("");
            setDesc("");

        } catch (error) {
            console.log("Error while minting NFT with contract")
            setMessage('Minting failed.');
            setLoading(false);
            console.log(error);
        }

    }

    const sendJSONtoIPFS = async (ImgHash: any) => {

        try {

            const resJSON = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
                data: {
                    "name": name,
                    "description": desc,
                    "image": ImgHash
                },
                headers: {
                    'pinata_api_key': "90ae2d07b5db2c7b8e21",
                    'pinata_secret_api_key': "2ab791f1b765aacfedbe482f613455709ff46885f181cd4104cfda11efc4bcc1",
                },
            });

            console.log("final ", `ipfs://${resJSON.data.IpfsHash}`)
            const tokenURI = `ipfs://${resJSON.data.IpfsHash}`;
            console.log("Token URI", tokenURI);
            mintNFT(tokenURI)   // pass the winner

        } catch (error) {
            console.log("JSON to IPFS: ")
            console.log(error);
            setLoading(false);

        }


    }

    const sendFileToIPFS = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        if (fileImg) {
            setLoading(true);
            setMessage('');
            try {
                // Create a FormData object and append the selected file to it
                const formData = new FormData();
                formData.append('file', fileImg);

                // Send a POST request to Pinata API to pin the file to IPFS
                const resFile = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                    headers: {
                        'pinata_api_key': "90ae2d07b5db2c7b8e21",
                        'pinata_secret_api_key': "2ab791f1b765aacfedbe482f613455709ff46885f181cd4104cfda11efc4bcc1",
                        'Content-Type': 'multipart/form-data'
                    },
                });

                // Construct the IPFS hash of the uploaded file
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                console.log(ImgHash); // Log the IPFS hash to the console
                sendJSONtoIPFS(ImgHash)
                // You can further process the IPFS hash as needed (e.g., minting an NFT)
            } catch (error) {
                console.error('Error sending File to IPFS: ', error);
                setLoading(false);

            }
        }
    };

    return (
        <>
        {/* <form onSubmit={sendFileToIPFS}>
            <input type="file" onChange={(e) => setFileImg(e.target.files ? e.target.files[0] : null)} required />
            <button type='submit'>Upload File to IPFS</button>
        </form> */}
          <h1 className='flex justify-center items-center text-white mb-3 font-bold'>Upload File to IPFS and Mint Your Own NFT</h1>
          <form onSubmit={sendFileToIPFS} className="bg-black p-4 rounded-md border-2 border-#89CFF0 space-y-3">
              <input type="file" onChange={(e) => setFileImg(e.target.files[0])} required />
              <input type="text" onChange={(e) => setName(e.target.value)} placeholder='name' style={{ marginRight: '1rem'}}  className="bg-black rounded-md border-2 border-#89CFF0 mt-2 p-2 rounded-md bg-dark border-blue-light focus:outline-none focus:border-blue" required value={name} />
              <input type="text" onChange={(e) => setDesc(e.target.value)} placeholder="desc" style={{ marginRight: '1rem' }}   className="bg-black rounded-md border-2 border-#89CFF0 mt-2 p-2 rounded-md border-gray-light focus:outline-none focus:border-blue" required value={desc} />
              <input type="text" onChange={(e) => setAddress(e.target.value)} placeholder="address" className="bg-black rounded-md border-2 border-#89CFF0 mt-2 p-2 rounded-md border-gray-light focus:outline-none focus:border-blue" required value={address} />
              <br />
              <div className='flex justify-center'>
              <button className='bttn_ui me-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3' type='submit' > {loading ? 'Minting...' : 'Mint NFT'}</button>
              {/* <Link to="/system" style={{ textDecoration: "none" }}> <button className='bttn_ui mt-3' style={{ background: "#60e6ff", }}> Go to Admin Panal</button></Link> */}
              </div>
              {message && (
                <p className={`mt-4 ${message.includes("failed") ? "text-red-500" : "text-green-500"}`}>
                    {message}
                </p>
            )}
          </form>
          </>
    );
};

export default UploadNNFTtoIPFS;

