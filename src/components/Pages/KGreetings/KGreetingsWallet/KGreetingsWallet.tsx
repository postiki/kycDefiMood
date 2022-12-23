import './KGreetingsWallet.scss';

import React, {useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Button from "../../../UI/Button";
import CheckBox from "../../../UI/CheckBox";
import PropTypes from "prop-types";
import {MetamaskWallet} from "../../../../services/metmask/metamask-wallet";

interface IKGreetingWalletProps {
    handleComplete: () => void,
}

const KGreetingWallet: React.FC<IKGreetingWalletProps> = ({handleComplete}) => {
    const translation = useTranslation('greetings')
    const [checked, setChecked] = useState(false)

    const isMobile = window.innerWidth < 1366

    const handleConnect = async () => {
        try {
            const wallet = new MetamaskWallet()
            await wallet.connect()
            const addr = await wallet.getAddr()
            console.log(addr)
            await handleComplete()
        } catch (e: any) {
            console.error(e)
            switch (e.code === 4200) {
                case isMobile:
                    console.log('mobile')
                    window.open('https://metamask.app.link/dapp/kyc.systems/')
                    break

                case !isMobile:
                    console.log('pc')
                    window.open('https://metamask.io/')
                    break
            }
        }
    }

    return (
        <div className={'greetings-wallet'}>
            <h1>{translation('title')}</h1>
            <Button
                handleClick={handleConnect}
                title={translation('walletBtn')}
                disabled={!checked}
            />
            <CheckBox checked={checked} onToggle={() => setChecked(!checked)} label={translation('disclaimer')}/>
        </div>
    )
}

KGreetingWallet.propTypes = {
    handleComplete: PropTypes.func.isRequired
}

export default KGreetingWallet;