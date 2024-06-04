"use client";
import { useEffect, useState, createContext } from 'react'
import { ethers } from "ethers";
import abi from "./abi.json";

export const MintContext = createContext()


export const MintProvider = ({ children }) => {

    const [chainId, setChainId] = useState("")

    const [currentAccount, setCurrentAccount] = useState("")
    const [MintContract, setMintContract] = useState("");
    const [tokenID, setTokenID] = useState(-1)

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    
    const contractAddress = "0xc9Af3A414dE210ff45D09730360247cF10CafAaa"
    const contractABI = abi;
    const { ethereum } = window;


    useEffect(() => {

        const getContract = () => {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const votSysContract = new ethers.Contract(contractAddress, contractABI, signer);
            console.log(votSysContract, "votSysContract")
         setMintContract(votSysContract);
        }
        if (ethereum)
            getContract();
    }, [ethereum, contractABI])




    useEffect(() => {

        if (ethereum) {
            ethereum.on("accountsChanged", (accounts) => {

                setCurrentAccount(accounts[0]);
            })

        }
        else
            console.log("No metamask!");

        return () => {
            // ethereum.removeListener('accountsChanged');

        }
    }, [ethereum])

    useEffect(() => {
        const checkIfWalletIsConnected = async () => {

            try {

                if (!ethereum) {
                    console.log("Metamask not found")
                    return;
                }
                else
                    console.log("we have etherium object");

                const accounts = await ethereum.request({ method: "eth_accounts" });  //check if there are accounts connected to the site

                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log("Found an authorized account:", account);
                    // if (currentAccount !== "")
                    setCurrentAccount(account)

                    // votingSystem();

                }
                else {
                    setCurrentAccount("")
                    console.log("No authorized accounts found!");
                }


                const curr_chainId = await ethereum.request({ method: 'eth_chainId' });
                setChainId(curr_chainId)

                ethereum.on('chainChanged', handleChainChanged);


                // Reload the page when they change networks
                function handleChainChanged(_chainId) {
                    window.location.reload();
                }

            } catch (error) {
                console.log(error);
            }
        }

        checkIfWalletIsConnected();
    }, [currentAccount, contractABI, ethereum])



    const connectWallet = async () => {
        try {

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" }); // request connection with accounts
            // console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
            // const chainId = await ethereum.request({ method: 'eth_chainId' });

        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {

        const setTokenID_Function = async () => {

            try {

                if (window.ethereum && currentAccount && MintContract && chainId === '11155111') {

                    let val = await MintContract.getTokenId();
                    console.log(val)
                    setTokenID(parseInt(val._hex) - 1);
                }

            } catch (error) {
                console.log(error);
            }
        }


        if (currentAccount) {
            setTokenID_Function()
        }


    }, [MintContract, currentAccount, chainId])

    console.log(MintContract, "mintcontract")

    return (
        <MintContext.Provider
            value={{
                chainId, currentAccount, MintContract, connectWallet, contractAddress
            }}
        >
            {children}
        </MintContext.Provider>
    )
}

