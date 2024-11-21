import {
  generateSigner,
  keypairIdentity,
  publicKey,
  some,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createCandyMachine,
  CreateInput,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-core-candy-machine";

import fs from "fs";

const umi = createUmi("https://api.devnet.solana.com");

const walletFile = JSON.parse(
  fs.readFileSync("/Users/ytakahashi/.config/solana/id.json", "utf8")
);

const keypair = umi.eddsa.createKeypairFromSecretKey(
  new Uint8Array(walletFile)
);

umi.use(keypairIdentity(keypair));
umi.use(mplCandyMachine());

console.log(`keypair is ${umi.identity.publicKey}`);

const candyMachine = generateSigner(umi);

const coreCollection = publicKey(
  "8Y9KBabGJTNKbYn9mk1TmET4BkbiKWhuZrXYR4B9vPvE"
);

const createIx = await createCandyMachine(umi, {
  candyMachine: candyMachine,
  collection: coreCollection,
  collectionUpdateAuthority: umi.identity,
  itemsAvailable: 100,
  configLineSettings: some({
    prefixName: "Example Asset #",
    nameLength: 15,
    prefixUri: "https://example.com/metadata/",
    uriLength: 29,
    isSequential: false,
  }),
});

await createIx.sendAndConfirm(umi);

console.log(`mint is ${candyMachine.publicKey}`);
