### 1 create Umi

use createUmi from @metaplex-foundation/umi-bundle-defaults

### 2 create a WalletFile

use fs
keypath
-> solana config get

### 3 create a KeyPair

umi.eddsa.createKeypairFromSecretKey

### 4 set KeyPair

keypairIdentity from @metaplex-foundation/umi"

### 5 set mplToolbox

mplToolbox from @metaplex-foundation/mpl-toolbox

### 6 create sol transfer transaction

transferSol from mpl-toolbox

#### 1. destination

-> publicKey from umi
sample account (ALRz3jGqhwDW2erRcMxBuPDsu3kFoDb251M9snHHW3Xe)

#### 2. amount

-> sol from umi

#### 3. setLatestBlockhash

### 7 get public keys

#### 1. create a set instance

-> distinctPublicKeys

#### 2. get public keys from instruction

-> transaction.items.instruction.keys
-> get if key is isWritable

### 8 get Recent PrioritizationFees

#### 1. fetch

-> umi.rpc.getEndpoint()

1.  method
2.  headers
3.  body
    -> params -> Array.from

#### 2.get data

await response.json() as { }

### 9 calculate an average

#### 1. get fees

#### 2. sort and get top 100

->topFees

#### 3. calculate average

1)Math.ceil  
2)reduce  
3)devide by topFees.length
