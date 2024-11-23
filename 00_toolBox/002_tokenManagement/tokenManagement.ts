import { generateSigner, keypairIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import fs from "fs";
import {
  createMint,
  CreateMintArgs,
  createToken,
  CreateTokenArgs,
} from "@metaplex-foundation/mpl-toolbox";
import { create } from "@metaplex-foundation/mpl-core-candy-machine";
const umi = createUmi("https://api.devnet.solana.com");

const walletFile = JSON.parse(
  fs.readFileSync("/Users/ytakahashi/.config/solana/id.json", "utf8")
);

const keyPair = umi.eddsa.createKeypairFromSecretKey(
  new Uint8Array(walletFile)
);

umi.use(keypairIdentity(keyPair));

// Part1 Create a Mint
const mint = generateSigner(umi);

const createMintInput: CreateMintArgs = {
  mint: mint,
  decimals: 0,
};

await createMint(umi, createMintInput).sendAndConfirm(umi);

// Part2 Create a token account

const token = generateSigner(umi);

const createTokenInput: CreateTokenArgs = {
  token: token,
  mint: mint.publicKey,
};

await createToken(umi, createTokenInput).sendAndConfirm(umi);
