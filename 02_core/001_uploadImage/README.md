### Step1 create a umi

use createUmi from @metaplex-foundation/umi-bundle-defaults

### Step2 get a wallet file

1. fs.readFileSync
2. JSON.parse

### Step3 get a key pair

1. umi.eddsa.createKeypairFromSecretKey
2. new Uint8Array

### Step4 Set to umi

1. umi.use
2. keypairIdentity from @metaplex-foundation/umi

### Step5 Set IrysUploader to umi

1. irysUploader from umi-uploader-irys
2. address: "https://devnet.irys.xyz"

### Step6 Create a Generic File

1. fs.readFileSync
2. path.join
3. createGenericFile
   1)content
   2)fileName
   3)options(tags[name, value])

### Step7 upload a image

1. await umi.uploader.upload

### Step8 replace a domain

1. https://arweave.net
2. https://devnet.irys.xyz
