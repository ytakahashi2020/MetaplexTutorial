import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import fs from "fs";
import {
  keypairIdentity,
  publicKey,
  sol,
  Umi,
  Transaction,
} from "@metaplex-foundation/umi";
import {
  mplToolbox,
  transferSol,
  setComputeUnitPrice,
  setComputeUnitLimit,
} from "@metaplex-foundation/mpl-toolbox";
import { base58, base64 } from "@metaplex-foundation/umi/serializers";

const umi = createUmi("https://api.devnet.solana.com");

const walletFile = JSON.parse(
  fs.readFileSync("/Users/ytakahashi/.config/solana/id.json", "utf8")
);

const keyPair = umi.eddsa.createKeypairFromSecretKey(
  new Uint8Array(walletFile)
);

umi.use(keypairIdentity(keyPair));
umi.use(mplToolbox());

const baseTransaction = await transferSol(umi, {
  destination: publicKey("ALRz3jGqhwDW2erRcMxBuPDsu3kFoDb251M9snHHW3Xe"),
  amount: sol(0.01),
}).setLatestBlockhash(umi);

// Default values if estimation fails
const DEFAULT_COMPUTE_UNITS = 800_000; // Standard safe value
const BUFFER_FACTOR = 1.1; // Add 10% safety margin

// Simulate the transaction to get actual compute units needed
const response = await fetch(umi.rpc.getEndpoint(), {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "simulateTransaction",
    params: [
      base64.deserialize(
        umi.transactions.serialize(baseTransaction.build(umi))
      )[0],
      {
        encoding: "base64",
        replaceRecentBlockhash: true,
        sigVerify: false,
      },
    ],
  }),
});

if (!response.ok) {
  throw new Error(`Failed to simulate transaction: ${response.status}`);
}

const data = await response.json();

console.log(data);
const unitsConsumed = data.result?.value?.unitsConsumed;

const calculatedUnits = !unitsConsumed
  ? DEFAULT_COMPUTE_UNITS
  : Math.ceil(unitsConsumed * BUFFER_FACTOR);

console.log(calculatedUnits);
