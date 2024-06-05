import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";

export const WalletConnect = () => {
  const { open } = useWeb3Modal();
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex justify-end">
      {address ? (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            className="mtsemibold connectBtn bttn_ui me-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
            style={{
              fontSize: "small",
              display: "inline-flex",
              marginRight: "0.2rem",
              alignSelf: "flex-start",
            }}
          >
            {/* <Image src={`/${chain}.png`} alt={chain} width={16} height={16} /> */}
            {address.substring(0, 4)}...{address.substring(address.length - 4)}
          </div>
          <button className="disconnectBtn" onClick={() => disconnect()}>
            {/* <Image src="/Disconnect.svg" alt="Disconnect" width={16} height={16} /> */}
          </button>
        </div>
      ) : (
        <button
          className="connectBtn hover connectPadding connect-wallet bttn_ui me-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
          onClick={() => open()}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;