### Step1 create a umi

use createUmi from @metaplex-foundation/umi-bundle-defaults

### Step2 get a wallet file

#### 1. fs.readFileSync

#### 2. JSON.parse

### Step3 get a key pair

#### 1. umi.eddsa.createKeypairFromSecretKey

#### 2. new Uint8Array

### Step4 Set to umi

#### 1. umi.use

#### 2. keypairIdentity from @metaplex-foundation/umi

### Step5 create a collection

#### 1. create collectionSigner by generateSigner

#### 2. createCollection from mpl-core

1. collection
2. name
3. uri

https://devnet.irys.xyz/uCHksWRGxnfQctScgjGgVWgrd7xBjwtxihVZjB72w1v

### Step6 create an asset into collection

#### 1. create asset by generateSigner

#### 2. create

1. asset
2. collection
3. name
4. uri  
   https://gateway.irys.xyz/EP2VzZh1nosBxtKhhhGcJ4GxcbUo6FpHqtCrcvnftyME
