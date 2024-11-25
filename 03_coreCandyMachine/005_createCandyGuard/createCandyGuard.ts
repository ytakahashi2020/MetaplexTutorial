import {
  generateSigner,
  keypairIdentity,
  some,
  transactionBuilder,
  sol,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  mplCandyMachine,
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
        botTax: some({ lamports: sol(0.001), lastInstruction: true }),
        solPayment: some({
          lamports: sol(1.5),
          destination: umi.identity.publicKey,
        }),
        startDate: some({ date: "2023-03-07T16:13:00.000Z" }),
        endDate: some({ date: "2023-03-08T16:13:00.000Z" }),
      },
    })
  )
  .sendAndConfirm(umi);

const candyGuard = findCandyGuardPda(umi, { base: base.publicKey });
const candyGuardAccount = await fetchCandyGuard(umi, candyGuard);

console.log(`candyGuardAccount is ${candyGuardAccount.publicKey}`);
