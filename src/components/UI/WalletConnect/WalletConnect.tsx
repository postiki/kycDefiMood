import './WalletConnect.scss'
import React from "react";
import classNames from "classnames";
import {useStore} from "effector-react";
import {ownerAddr$} from "../../../entities/user";
import {connectWallet} from "../../../entities/KYC/wallet-connect";

interface IWalletConnect {

}

const WalletConnect: React.FC<IWalletConnect> = () => {
    const userAddr = useStore(ownerAddr$)

    const formatAddr = () => {
        const splitedAddr = userAddr.split('')
        const firstPart = splitedAddr.slice(0, 7).join('')
        const secondPart = splitedAddr.slice(35, splitedAddr.length).join('')
        return firstPart + '...' + secondPart
    }

    return (
        <div className={'wallet-connect'}>
            <div className={'wallet-connect-status'}>
                <div className={classNames({
                    'wallet-connect-status-marker': true,
                    'wallet-connect-status-marker--connect': userAddr
                })}
                />
            </div>
            <button
                onClick={() => !userAddr && connectWallet()}>
                {userAddr ? `${formatAddr()}` : 'Connect wallet'}
            </button>
            <div/>
        </div>
    )
}

export default WalletConnect;