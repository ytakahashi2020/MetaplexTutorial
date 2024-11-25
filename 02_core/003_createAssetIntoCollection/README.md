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

### Step5 create a collection

1. createCollection from mpl-core

### Step6 create an asset into collection

1. fetchCollection
2. create (set collection)
