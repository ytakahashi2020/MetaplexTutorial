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

### Step5 create sample publicKeys

const creator1 = publicKey("7k6qQmQhZvu7toivZTjxSv43FBaXzK2mUEBUhQ4Jucqo");  
const creator2 = publicKey("6NKkyM14Q8DpPGBY6S5UXoy1arrPSrQ9a2vWErNzNm12");  
const allow1 = publicKey("8BgiiWipqoSf6zadDF8EcA3MDTCXFampjX7AJ46ZEFky");  
const allow2 = publicKey("ALRz3jGqhwDW2erRcMxBuPDsu3kFoDb251M9snHHW3Xe");

### Step6 create an asset

#### 1. create asset by generateSigner

#### 2. create from mpl-core

#### 3. set plugins

uri: https://devnet.irys.xyz/uCHksWRGxnfQctScgjGgVWgrd7xBjwtxihVZjB72w1v

1. type
2. basisPoints
3. creators
4. ruleSet
   -> use ruleSet from mpl-core

### Step7 confirm the result

1. fetchAssetV1
