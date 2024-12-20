import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import fs from "fs";
import { keypairIdentity, publicKey, sol } from "@metaplex-foundation/umi";
import { mplToolbox, transferSol } from "@metaplex-foundation/mpl-toolbox";

const umi = createUmi("https://api.devnet.solana.com");

const walletFile = JSON.parse(
  fs.readFileSync("/Users/ytakahashi/.config/solana/id.json", "utf8")
);

const keyPair = umi.eddsa.createKeypairFromSecretKey(
  new Uint8Array(walletFile)
);

umi.use(keypairIdentity(keyPair));
umi.use(mplToolbox());

const basicTransaction = await transferSol(umi, {
  destination: publicKey("ALRz3jGqhwDW2erRcMxBuPDsu3kFoDb251M9snHHW3Xe"),
  amount: sol(0.01),
}).setLatestBlockhash(umi);

const distinctPublicKeys = new Set<string>();

basicTransaction.items.forEach((item) => {
  item.instruction.keys.forEach((key) => {
    if (key.isWritable) {
      distinctPublicKeys.add(key.pubkey.toString());
    }
  });
});

const response = await fetch(umi.rpc.getEndpoint(), {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "getRecentPrioritizationFees",
    params: [Array.from(distinctPublicKeys)],
  }),
});

const data = (await response.json()) as {
  result: {
    prioritizationFee: number;
    slot: number;
  }[];
};

console.log(data);

const fees = data.result?.map((entry) => entry.prioritizationFee) || [];
const topFees = fees.sort((a, b) => b - a).slice(0, 100);
const average =
  topFees.length > 0
    ? Math.ceil(topFees.reduce((sum, fee) => sum + fee, 0) / topFees.length)
    : 0;

console.log(`averageFee is ${average}`);
