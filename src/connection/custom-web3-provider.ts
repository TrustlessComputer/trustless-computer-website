import { ICustomTransaction } from '@/interfaces/transaction';
import Web3 from 'web3';

class CustomWeb3Provider {
  private web3: Web3;

  constructor(rpcEndpoint: string) {
    this.web3 = new Web3(rpcEndpoint);
  }

  async getTransaction(txHash: string): Promise<ICustomTransaction> {
    const tx = (await this.web3.eth.getTransaction(txHash)) as ICustomTransaction;
    return tx;
  }
}

export default CustomWeb3Provider;
