### Step0 Use case

The main use cases for the Metaplex Protocol Candy Machine are as follows:

#### 1 Minting NFT Collections

Efficiently and fairly mint digital art and game items.

#### 2 Automating NFT Sales

Manage fair pricing, oversee sales, and distribute NFTs in real-time.

#### 3 Providing a Fair Sales Environment

Ensure a fair NFT purchasing experience with bot protection and randomized allocation.

umi is a basic function when we use metaplex.

![](./images/official.png)

### Step1 create a umi

use createUmi from @metaplex-foundation/umi-bundle-defaults

### Step2 get a wallet file

1.fs.readFileSync  
2.JSON.parse

### Step3 get a key pair

1.umi.eddsa.createKeypairFromSecretKey  
2.new Uint8Array

### Step4 Set to umi

1.umi.use  
2.keypairIdentity from @metaplex-foundation/umi  
3.mplCandyMachine

### Step5 Create a signer and publickey about collection

1.generateSigner  
2.publickey (we use BzPuPVqtBrY2UcAN7phrv2icUbpXgqczZcMjAyx273cG)

### Step6 Create a transaction

1.use createCandyGuard from mpl-core-candy-machine  
2.parameters
1)base  
2)guards  
2-1)botTax
2-2)solPayment
2-3)startDate
2-4)endDate
3.sendAndConfirm

### Step 7 get a candyGuardAccount

1.findCandyGuardPda
2.fetchCandyGuard

### Step 8 mint

1.mintV1
2.parameters
2-1)candyMachine
2-2)asset
2-3)collection
3.sendAndConfirm
4.Confirm error happens
