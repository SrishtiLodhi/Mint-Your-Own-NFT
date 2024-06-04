# Mint-Your-Own-NFT

Minting your own NFT using IPFS with Pinata and uploading the necessary metadata. By following these steps, you will be able to mint an NFT that includes a PNG image, a name, a description, and the address where it is minted.

### Create Metadata for Your NFT

Create a JSON file containing the metadata for your NFT. This file will include the CID of the uploaded image, a name, a description, and the address to be minted to.

Example `metadata.json`:
```json
{
  "name": "My Unique NFT",
  "description": "This is a description of my unique NFT.",
  "image": "ipfs://YOUR_IMAGE_CID",
  "address": "0xYourEthereumAddress"
}
