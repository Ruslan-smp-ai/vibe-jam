import './order.css';
import React, { useState, useEffect, useContext } from 'react';
import MusicCardContainer from '../Music-Card-Container/music-card-container';
const Order = (props) => {
    const { isOrderActive, handleCardClick, activeCard, handleOrderCardClicked, ID } = props;
    const orderClassName = `order-list ${isOrderActive ? 'order-is-active' : ''}`;
    const [idCurrent, setidCurrent] = useState("container1")


    const handleClick = () => {
        handleOrderCardClicked();
    }
    
    useEffect(() => {
        setidCurrent(ID || "container1");
      }, [ID]);

    return (    
        <div className={orderClassName} onClick={handleClick}>
            <MusicCardContainer               
                ID={idCurrent}
                title="In order"
                slice={undefined}
                activeCard={activeCard}
                handleCardClick={handleCardClick}
                isOrder
                >
            </MusicCardContainer>
        </div>
    )
};
export default Order;