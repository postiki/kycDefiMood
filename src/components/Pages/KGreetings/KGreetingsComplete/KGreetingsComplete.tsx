import './KGreetingsComplete.scss'
import React, {useEffect} from "react";
import useTranslation from "../../../../hooks/useTranslation";
import Button from "../../../UI/Button";
import PropTypes from "prop-types";

interface IKGreetingsCompleteProps {
    handleComplete: () => void,
    handleAddReferral: () => void,
    enableAddRefCode: boolean,
}

const KGreetingsComplete: React.FC<IKGreetingsCompleteProps> = ({
                                                                    handleComplete,
                                                                    handleAddReferral,
                                                                    enableAddRefCode
                                                                }) => {
    const translation = useTranslation('greetings')

    useEffect(() => {
        const handleEnter = (event: any) => {
            if (event.keyCode === 13) {
                handleComplete();
            }
        };
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, []);

    return (
        <div className={'greetings-complete'}>
            <h1>{translation('title')}</h1>
            <h2>{translation('completeTitle')}<br/>ヽ(・∀・)ﾉ</h2>
            <Button handleClick={handleComplete} title={translation('btnContinue')}/>
            {enableAddRefCode &&
                <p>
                    {translation('enabledReferral')}
                    <br/>
                    <span onClick={handleAddReferral}>
                    {translation('enterCode')}
                    </span>
                </p>
            }
        </div>
    )
}

KGreetingsComplete.propTypes = {
    handleComplete: PropTypes.func.isRequired,
    handleAddReferral: PropTypes.func.isRequired,
    enableAddRefCode: PropTypes.bool.isRequired,
}

export default KGreetingsComplete