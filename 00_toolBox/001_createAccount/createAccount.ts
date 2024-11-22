import {
  createAccount,
  CreateAccountInstructionArgs,
  CreateAccountInstructionAccounts,
} from "@metaplex-foundation/mpl-toolbox";
import {
  keypairIdentity,
  generateSigner,
  publicKey,
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

const newAccount = generateSigner(umi);
const space = 42;
const lamports = await umi.rpc.getRent(space);
// token2022
const programId = publicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

const input: CreateAccountInstructionAccounts & CreateAccountInstructionArgs = {
  payer: umi.payer,
  newAccount: newAccount,
  lamports: lamports,
  space: space,
  programId: programId,
};

await createAccount(umi, input).sendAndConfirm(umi);

console.log(`account is ${newAccount.publicKey}`);
