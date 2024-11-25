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

const imageFile = fs.readFileSync(path.join("./test.png"));

const umiImageFile = createGenericFile(imageFile, "test.png", {
  tags: [{ name: "Content-Type", value: "image/png" }],
});

const imageUri = await umi.uploader.upload([umiImageFile]).catch((err) => {
  throw new Error(err);
});

const updatedUri = imageUri[0].replace(oldDomain, newDomain);

console.log(`Image URL: ${updatedUri}`);
