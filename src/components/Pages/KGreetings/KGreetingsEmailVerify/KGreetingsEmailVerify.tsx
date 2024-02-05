import './KGreetingsEmailVerify.scss'

import React, {useState} from "react";
import KGreetingsEmail from "./KGreetingsEmail";
import KGreetingsVerifyCode from "./KGreetingsVerifyCode";

interface IKEmailVerifyProps {

}

const KGreetingsEmailVerify: React.FC<IKEmailVerifyProps> = () => {
    const [codeSend, setCodeSend] = useState(false)

    const handleSendCode = () => {
        setCodeSend(true)
    }

    if (codeSend) {
        return (
            <KGreetingsVerifyCode/>
        )
    }

    return (
        <KGreetingsEmail handleSendCode={handleSendCode}/>
    )
}
export default KGreetingsEmailVerify;