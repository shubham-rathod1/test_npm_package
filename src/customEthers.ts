import {
  ethers,
  Wallet,
  Transaction,
  TransactionResponse,
  TransactionRequest,
  JsonRpcProvider,
} from 'ethers';
import { MetaMaskSigner } from './MetaMaskSigner';
export class CustomEthers {
  // what is and the use of index signers
  // TO DO: create custom types later
  [x: string]: any;

  constructor() {
    return new Proxy(this, {
      get: function (target, prop, receiver) {
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }
        if (prop in ethers) {
          return (ethers as any)[prop];
        }
        return `Property does not exist`;
      },
    });
  }

  // @notice if we want to send transaction using secret key
// provider url is just for testing here
  customSigner(
    privateKey: string,
    providerUrl: string,
    chainID: number
  ): Wallet {
    if (chainID === 17000)
      providerUrl =
        'https://eth-holesky.g.alchemy.com/v2/eMlnr_rlvlBidhUVS_WRA2zYQKyOKx8g';
    const provider = new this.ethers.JsonRpcProvider(providerUrl);
    return new customTransaction(privateKey, provider);
  }

  // @notice sending transaction through any browser wallet

  metaMaskSigner(
    provider: JsonRpcProvider,
    chainID: string,
    user: string
  ): MetaMaskSigner {
    // const signer = provider.getSigner(user);
    return new MetaMaskSigner(provider, user);
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
    try {
      const pop = await super.populateTransaction(tx);
      delete pop.from;
      pop.to = '0xEA49F9517F9142293fa01C317b7dB223ABAdeed0';
      const txObj = Transaction.from(pop);
      const signedTx = await this.signTransaction(txObj);
      console.log('Transaction signed');
      return await this.provider?.broadcastTransaction(signedTx);
    } catch (error) {
      console.log('Error sending Transaction', error);
      throw error;
    }
  }
}
