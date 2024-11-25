import { create, fetchAsset, transferV1 } from "@metaplex-foundation/mpl-core";
import { keypairIdentity, generateSigner } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import fs from "fs";
const umi = createUmi("https://api.devnet.solana.com");

const walletFile = JSON.parse(
  fs.readFileSync("/Users/ytakahashi/.config/solana/id.json", "utf8")
);

const keyPair = umi.eddsa.createKeypairFromSecretKey(
  new Uint8Array(walletFile)
);

umi.use(keypairIdentity(keyPair));

// generate assetSigner and then create the asset.
const asset = generateSigner(umi);
const destination = generateSigner(umi);

await create(umi, {
  asset: asset,
  name: "My Asset v1",
  uri: "https://example.com/my-asset.json",
}).sendAndConfirm(umi);

await transferV1(umi, {
  asset: asset.publicKey,
  newOwner: destination.publicKey,
}).sendAndConfirm(umi);

console.log(`Asset address is  ${asset.publicKey}`);
console.log(`Destination address is  ${destination.publicKey}`);

const fetcedAsset = await fetchAsset(umi, asset.publicKey);

console.log(`Owner Address is ${fetcedAsset.owner}`);
