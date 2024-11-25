import { create, fetchAsset, update } from "@metaplex-foundation/mpl-core";
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

await create(umi, {
  asset: asset,
  name: "My Asset v1",
  uri: "https://example.com/my-asset.json",
}).sendAndConfirm(umi);

console.log(`asset is ${asset.publicKey}`);

const beforeAsset = await fetchAsset(umi, asset.publicKey);

console.log(`asset name is ${beforeAsset.name}`);

await update(umi, {
  asset: beforeAsset,
  name: "My Asset v2",
  uri: "https://example.com/my-asset.json",
}).sendAndConfirm(umi);

const afterAsset = await fetchAsset(umi, asset.publicKey);
console.log(`asset name is ${afterAsset.name}`);
