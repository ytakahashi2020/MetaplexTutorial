import { keypairIdentity, createGenericFile } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import fs from "fs";
import path from "path";
const umi = createUmi("https://api.devnet.solana.com");
const oldDomain = "https://arweave.net";
const newDomain = "https://devnet.irys.xyz";

const walletFile = JSON.parse(
  fs.readFileSync("/Users/ytakahashi/.config/solana/id.json", "utf8")
);

const keyPair = umi.eddsa.createKeypairFromSecretKey(
  new Uint8Array(walletFile)
);

umi.use(keypairIdentity(keyPair));
umi.use(
  irysUploader({
    address: "https://devnet.irys.xyz",
  })
);

const imageUri =
  "https://devnet.irys.xyz/7VmVnnuNh2ukenTcNF6YEb14i9D2YQFgdj1SwufJziTN";

const uploadUri = await umi.uploader.uploadJson({
  name: "My NFT",
  description: "This is my NFT",
  image: imageUri,
});
const updatedUri = uploadUri.replace(oldDomain, newDomain);

console.log(`Image URL: ${updatedUri}`);
