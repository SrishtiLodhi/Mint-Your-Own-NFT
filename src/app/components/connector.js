import abi from "./utils/abi.json"
import { ethers } from "ethers";

const contractAddress = "0xc9Af3A414dE210ff45D09730360247cF10CafAaa";

export const mintNFTFunc = async (address, tokenURI) => {
    try { 
        // Check if the window.ethereum object is available
        if (typeof window.ethereum !== 'undefined') {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_accounts' });
 
            // Create an ethers provider from window.ethereum
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log("provider : ", provider);
 
            // Get the signer from the provider
            const signer = provider.getSigner();
            console.log("signer : ", signer);
 
            // Replace 'contractAddress' and 'abi' with your actual contract address and ABI
            const MintContract = new ethers.Contract(contractAddress, abi, signer);
 
            // Call the safeMint function from your contract
            // await MintContract.safeMint(address, tokenURI);

            await MintContract.safeMint(address, tokenURI , {
                from: address
              });
 
            console.log("NFT minted successfully!");
 
        } else {
            console.log("Ethereum provider not found. Install MetaMask.");
        }
    } catch (e) { 
        console.log("Error : ", e);
    }
 }
 