"use client";
import Image from "next/image";
import UploadNNFTtoIPFS from "./components/UploadNFTtoIPFS";



import { WagmiProvider } from 'wagmi'
import { config } from '../../config' 
import {Wallet} from "./components/WalletConnect";
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'




const Home: React.FC = () => {
  const queryClient = new QueryClient()
  
  return (
    
      <WagmiProvider config={config}> 
       <QueryClientProvider client={queryClient}>
        <div>
            <Wallet />
            <main>
              <UploadNNFTtoIPFS />
            </main>
          </div>
       </QueryClientProvider>
       
       </WagmiProvider>
   
  );
}

export default Home;
