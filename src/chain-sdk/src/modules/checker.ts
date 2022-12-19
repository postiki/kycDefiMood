import {ethers, utils} from 'ethers';
import {Contract} from './contract';
export class Checker extends Contract {
    protected readonly name = 'checker';

    private readonly _interface = new utils.Interface([
        // 'function presaleMint(bytes signature) external payable',
    ]);

    public async presaleMint(ownerAddr: string, cntractAddr: string){
        // const contract = new ethers.Contract(this.client.network.contracts.nft, this._interface, this.client.signer)
        try {
            // const res = await contract.presaleMint(tokens, {gasLimit: 1850_00, value: await this.getPresalePrice()})
            // return res
        }catch (e){
            console.log(e)
        }
    }
}
