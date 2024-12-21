import {
  create,
  createCollection,
  fetchCollection,
  ruleSet,
  fetchAssetV1,
} from "@metaplex-foundation/mpl-core";
import {
  keypairIdentity,
  createGenericFile,
  generateSigner,
  publicKey,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import fs from "fs";
import base58 from "bs58";
const umi = createUmi("https://api.devnet.solana.com");

const walletFile = JSON.parse(
  fs.readFileSync("/Users/ytakahashi/.config/solana/id.json", "utf8")
);

const keyPair = umi.eddsa.createKeypairFromSecretKey(
  new Uint8Array(walletFile)
);

umi.use(keypairIdentity(keyPair));

const creator1 = publicKey("7k6qQmQhZvu7toivZTjxSv43FBaXzK2mUEBUhQ4Jucqo");
const creator2 = publicKey("6NKkyM14Q8DpPGBY6S5UXoy1arrPSrQ9a2vWErNzNm12");
const allow1 = publicKey("8BgiiWipqoSf6zadDF8EcA3MDTCXFampjX7AJ46ZEFky");
const allow2 = publicKey("ALRz3jGqhwDW2erRcMxBuPDsu3kFoDb251M9snHHW3Xe");

const rule = ruleSet("ProgramAllowList", [[allow1, allow2]]);

// generate assetSigner and then create the asset.
const asset = generateSigner(umi);

const result = await create(umi, {
  asset: asset,
  name: "My Asset",
  uri: "https://example.com/my-asset.json",
  plugins: [
    {
      type: "Royalties",
      basisPoints: 500,
      creators: [
        { address: creator1, percentage: 20 },
        { address: creator2, percentage: 80 },
      ],
      ruleSet: rule,
    },
  ],
}).sendAndConfirm(umi);

console.log(`signature is ${base58.encode(result.signature)}`);

const fetchedAsset = await fetchAssetV1(umi, asset.publicKey);

console.log(fetchedAsset.royalties?.ruleSet);
