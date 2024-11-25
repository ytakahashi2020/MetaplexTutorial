import {
  generateSigner,
  keypairIdentity,
  publicKey,
  some,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  addConfigLines,
  create,
  fetchCandyMachine,
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
  "BzPuPVqtBrY2UcAN7phrv2icUbpXgqczZcMjAyx273cG"
);

const createIx = await create(umi, {
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

console.log(`candyMachine is ${candyMachine.publicKey}`);

await addConfigLines(umi, {
  candyMachine: candyMachine.publicKey,
  index: 0,
  configLines: [
    { name: "1", uri: "1.json" },
    { name: "2", uri: "2.json" },
  ],
}).sendAndConfirm(umi);

const InsertedCandyMachine = await fetchCandyMachine(
  umi,
  candyMachine.publicKey
);

console.log(`item 1 name is ${InsertedCandyMachine.items[0].name}`);
console.log(`item 2 name is ${InsertedCandyMachine.items[1].name}`);
