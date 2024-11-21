import { keypairIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import fs from "fs";

const umi = createUmi("http://api.devnet.solana.com");

const walletFile = JSON.parse(
  fs.readFileSync("/Users/ytakahashi/.config/solana/id.json", "utf8")
);

const keyPair = umi.eddsa.createKeypairFromSecretKey(
  new Uint8Array(walletFile)
);

umi.use(keypairIdentity(keyPair));

console.log(`public key is ${umi.identity.publicKey}`);
