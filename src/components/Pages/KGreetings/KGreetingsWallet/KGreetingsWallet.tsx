import './KGreetingsWallet.scss';

import React, {useState} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Button from "../../../UI/Button";
import CheckBox from "../../../UI/CheckBox";
import PropTypes from "prop-types";
import {connectWallet} from "../../../../services/connect-wallet";

interface IKGreetingWalletProps {
    handleComplete: () => void,
}

const KGreetingWallet: React.FC<IKGreetingWalletProps> = ({handleComplete}) => {
    const translation = useTranslation('greetings')
    const [checked, setChecked] = useState(false)

    const handleConnect = async () => {
        await connectWallet().then(() => handleComplete())
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