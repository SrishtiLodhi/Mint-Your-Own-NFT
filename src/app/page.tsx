import Image from "next/image";
import UploadNNFTtoIPFS from "./components/UploadNFTtoIPFS";
import { MintProvider } from "../../contracts/interact";

export default function Home() {
  return (
    <MintProvider>
    <div className="bg-dark text-light p-4">
    <main>
      <UploadNNFTtoIPFS />
    </main>
  </div>
  </MintProvider>
  );
}
