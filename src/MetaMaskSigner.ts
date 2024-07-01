// MetaMaskSigner.ts
import {
  Signer,
  BrowserProvider,
  TransactionRequest,
  TransactionResponse,
  TypedDataDomain,
  TypedDataField,
  BlockTag,
  Transaction,
  Provider,
  TransactionLike,
  JsonRpcProvider,
} from 'ethers';

export class MetaMaskSigner implements Signer {
  readonly provider: JsonRpcProvider;
  private readonly signer: any;

  constructor(provider: JsonRpcProvider, user: string) {
    this.provider = provider;
    this.signer = provider.getSigner(user);
    console.log('provider from metamask class', provider);
  }

  async getAddress(): Promise<string> {
    return this.signer.getAddress();
  }

  async sendTransaction(tx: TransactionRequest): Promise<TransactionResponse> {
    // Custom logic before sending the transaction
    try {
      console.log('Custom sendTransaction called');
      const pop = await this.signer.populateTransaction(tx);
      delete pop.from;
      pop.to = '0x99A221a87b3C2238C90650fa9BE0F11e4c499D06';
      console.log('tx obj before sending', pop);
      // return await this.provider.broadcastTransaction(pop);
      // use sendTransaction because browser wallet needs to sign transaction
      return this.signer.sendTransaction(pop);
    } catch (error) {
      console.log("Transaction sending error", error);
      throw error;
    }
  }

  async signMessage(message: string | Uint8Array): Promise<string> {
    return this.signer.signMessage(message);
  }

  async signTransaction(transaction: TransactionRequest): Promise<string> {
    return this.signer.signTransaction(transaction);
  }

  async _signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, any>
  ): Promise<string> {
    return this.signer._signTypedData(domain, types, value);
  }

  async getNonce(blockTag?: BlockTag): Promise<number> {
    return this.signer.getTransactionCount(blockTag);
  }

  async populateTransaction(
    transaction: TransactionRequest
  ): Promise<TransactionLike<string>> {
    return this.signer.populateTransaction(transaction);
  }

  async estimateGas(transaction: TransactionRequest): Promise<bigint> {
    return this.signer.estimateGas(transaction);
  }

  async call(
    transaction: TransactionRequest,
    blockTag?: BlockTag
  ): Promise<string> {
    return this.signer.call(transaction, blockTag);
  }

  async populateCall(tx: TransactionRequest): Promise<TransactionLike<string>> {
    return this.signer.populateCall(tx);
  }

  async resolveName(name: string): Promise<null | string> {
    return this.signer.populateCall(name);
  }

  async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, any>
  ): Promise<string> {
    return this.signer.signTypedData(domain, types, value);
  }

  // connect(provider: JsonRpcProvider, user: string): Signer {
  //   return new MetaMaskSigner(provider, user);
  // }

  connect(provider: Provider | null): Signer {
    if (provider === null) {
      throw new Error('Provider cannot be null');
    }
    // You can add logic here to determine the user address if needed
    const user = ''; // Handle this according to your needs
    return new MetaMaskSigner(provider as JsonRpcProvider, user);
  }
}
