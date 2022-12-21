import {ethers, utils} from 'ethers';
import {Contract} from './contract';

export class Checker extends Contract {
    protected readonly name = 'checker';

    private readonly _interface = new utils.Interface([
        'function getOwner() external view returns (address)',
    ]);

    public async getOwnerAddr(contractAddr: string) {
        const contract = new ethers.Contract(contractAddr, this._interface, this.client.signer)
        try {
            const res = await contract.getOwner()
            return res
        } catch (e) {
            console.log(e)
        }
    }
}
