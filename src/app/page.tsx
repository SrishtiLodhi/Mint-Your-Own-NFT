import Image from "next/image";
import UploadNNFTtoIPFS from "./components/UploadNFTtoIPFS";

export default function Home() {
  return (
    <>
      <div>
        <main>
          <UploadNNFTtoIPFS />
        </main>
      </div>
    </>
  );
}
