### 1 create Umi

### 2 create a WalletFile

### 3 create a KeyPair

### 4 set KeyPair

### 5 set mplToolbox

### 6 create sol transfer transaction

#### 1. destination

-> publicKey from umi

#### 2. amount

-> sol from umi

#### 3. setLatestBlockhash

### 7 get public keys

#### 1. create a set instance

-> distinctPublicKeys

#### 2. for each

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
