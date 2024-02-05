import './KGreetingsWallet.scss';

import React, {useState} from "react";

import useTranslation from "../../../../hooks/useTranslation";
import Button from "../../../UI/Button";
import CheckBox from "../../../UI/CheckBox";
import {useStore} from "effector-react";
import {ownerAddr$} from "../../../../entities/user";
import ModalPage from "../../../UI/ModalPage";
import {performTransition} from "../../../../entities/KYC/controller";

interface IKGreetingWalletProps {
}

const KGreetingWallet: React.FC<IKGreetingWalletProps> = () => {
    const translation = useTranslation('greetings')
    const [checked, setChecked] = useState(false)
    const userAddr = useStore(ownerAddr$)

    return (
        <ModalPage>
            <div className={'greetings-wallet'}>
                <h1>{translation('title')}</h1>
                <h2>{translation('subTitle')}</h2>
                <CheckBox
                    checked={checked}
                    onToggle={() => setChecked(!checked)}
                    label={translation('disclaimer')}
                />
                <Button
                    handleClick={() => performTransition('next')}
                    title={translation('walletBtn')}
                    disabled={!checked || !userAddr}
                />
            </div>
        </ModalPage>
    )
}

KGreetingWallet.propTypes = {}

export default KGreetingWallet;