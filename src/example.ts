import { BigNumber } from 'bignumber.js';
import { nuemaParams } from './types';
import { CustomEthers } from './customEthers';
import { ethers } from 'ethers';

export async function injectNeuma(
  // chainID: number,
  // value: string,
  // userAddress: string
) {
  const customEthers = new CustomEthers();

  // const privateKey = 'your private key';
  // const providerUrl =
  //   'https://eth-holesky.g.alchemy.com/v2/VZuKJ8r8DNkp7-YEc8NNg51BQnuwdhXK';
  // // "https://polygon-amoy.g.alchemy.com/v2/eMlnr_rlvlBidhUVS_WRA2zYQKyOKx8g";
  // const customSigner = customEthers.customSigner(privateKey, providerUrl, chainID);
  // // const random = customEthers.Wallet
  // const tx = {
  //   to: '0x4605A6219BC5f9138E4a265C1c3e9fDD4FE1E256',
  //   value: customEthers.parseEther("0.001")
  //   // value: ethers.parseEther('0.001'),
  // };
  // const response = await customSigner.sendTransaction(tx);
  // console.log(response);

  console.log(customEthers.Wallet.createRandom());

}

injectNeuma();