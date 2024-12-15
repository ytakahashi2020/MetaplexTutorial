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

### 6 Set const

DEFAULT_COMPUTE_UNITS = 800_000
BUFFER_FACTOR = 1.1

### 7 get a response

1 use fetch  
2 simulateTransaction  
3 base64.deserialize from @metaplex-foundation/umi/serializers
4 umi.transaction.serialize  
5 check response is ok

### 8 get a data

1 await response.json();  
2 get unitsConsumed
3 Math.ceil