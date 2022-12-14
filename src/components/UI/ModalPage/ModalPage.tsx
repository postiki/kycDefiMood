import './ModalPage.scss'
import React from "react";
import PropTypes from "prop-types";

interface IModalPageProps {
    children: React.ReactNode
}

const ModalPage: React.FC<IModalPageProps> = ({children}) => {
    return (
        <div className={'k-modal'}>
            {children}
        </div>
    )
}

ModalPage.propTypes={
    children: PropTypes.node.isRequired,
}

export default ModalPage;