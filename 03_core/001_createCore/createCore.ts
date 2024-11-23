import { createCollection, mplCore } from "@metaplex-foundation/mpl-core";
import { generateSigner, keypairIdentity } from "@metaplex-foundation/umi";
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
umi.use(mplCore());

const collectionMint = generateSigner(umi);

await createCollection(umi, {
  collection: collectionMint,
  name: "test",
  uri: "https://rose-leading-cricket-429.mypinata.cloud/ipfs/QmY2okinjnaMwFBo62fmEycFaBcgM1PLQHUBctUyhKTp53/1.json",
}).sendAndConfirm(umi);

console.log(`collection mint is ${collectionMint.publicKey}`);
