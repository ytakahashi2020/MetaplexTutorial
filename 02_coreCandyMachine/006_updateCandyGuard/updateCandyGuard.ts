import {
  generateSigner,
  keypairIdentity,
  publicKey,
  some,
  dateTime,
  transactionBuilder,
  sol,
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
  updateCandyGuard,
  fetchCandyGuard,
  findCandyGuardPda,
  createCandyGuard,
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

const base = generateSigner(umi);

await transactionBuilder()
  .add(
    createCandyGuard(umi, {
      base,
      guards: {
        startDate: some({ date: "2023-03-07T16:13:00.000Z" }),
        botTax: some({ lamports: sol(0.001), lastInstruction: true }),
      },
    })
  )
  .sendAndConfirm(umi);

const candyGuard = findCandyGuardPda(umi, { base: base.publicKey });
const candyGuardAccount = await fetchCandyGuard(umi, candyGuard);

console.log(`start date is ${candyGuardAccount.guards.botTax}`);
console.log(`candyGuard is ${candyGuard}`);

console.log(`candyGuardAccount is ${candyGuardAccount.publicKey}`);

await transactionBuilder()
  .add(
    updateCandyGuard(umi, {
      candyGuard,
      guards: {
        startDate: some({ date: "2024-01-01T16:13:00.000Z" }),
      },
      groups: [],
    })
  )
  .sendAndConfirm(umi);

console.log(`start date is ${candyGuardAccount.guards.startDate}`);
