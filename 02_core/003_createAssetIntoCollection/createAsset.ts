import {
  create,
  createCollection,
  fetchCollection,
} from "@metaplex-foundation/mpl-core";
import {
  keypairIdentity,
  createGenericFile,
  generateSigner,
} from "@metaplex-foundation/umi";
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

const collectionSigner = generateSigner(umi);

// create collection
// if you are doing this in a single script you may have
// to use a sleep function or commitment level of 'finalized'
// so the collection is fully written to change before fetching it.
await createCollection(umi, {
  collection: collectionSigner,
  name: "My Collection",
  uri: "https://example.com/my-collection.json",
}).sendAndConfirm(umi);

// fetch the collection
const collection = fetchCollection(umi, collectionSigner.publicKey);

// generate assetSigner and then create the asset.
const asset = generateSigner(umi);

await create(umi, {
  asset: asset,
  collection: collectionSigner,
  name: "My Asset",
  uri: "https://example.com/my-asset.json",
}).sendAndConfirm(umi);

console.log(`asset is ${asset.publicKey}`);
