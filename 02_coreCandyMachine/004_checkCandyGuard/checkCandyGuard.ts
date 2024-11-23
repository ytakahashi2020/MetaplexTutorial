import {
  generateSigner,
  keypairIdentity,
  publicKey,
  some,
  dateTime,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  addConfigLines,
  createCandyMachine,
  CreateInput,
  fetchCandyMachine,
  mplCandyMachine,
  mintV1,
  create,
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
  itemsAvailable: 1,
  authority: umi.identity.publicKey,
  configLineSettings: some({
    prefixName: "Asset #",
    nameLength: 15,
    prefixUri: "https://example.com/metadata/",
    uriLength: 29,
    isSequential: false,
  }),
  guards: {
    startDate: some({
      date: dateTime("2025-01-24T15:30:00.000Z"),
    }),
  },
});

await createIx.sendAndConfirm(umi);

console.log(`candyMachine is ${candyMachine.publicKey}`);

await addConfigLines(umi, {
  candyMachine: candyMachine.publicKey,
  index: 0,
  configLines: [{ name: "1", uri: "1.json" }],
}).sendAndConfirm(umi);

const asset = generateSigner(umi);

await mintV1(umi, {
  candyMachine: candyMachine.publicKey,
  asset: asset,
  collection: coreCollection,
}).sendAndConfirm(umi);

console.log(`asset is ${asset.publicKey}`);