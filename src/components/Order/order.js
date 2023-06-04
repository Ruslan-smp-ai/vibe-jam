import './order.css';
import React, { useState, useEffect } from 'react';
const Order = (props) => {
    const { isOrderActive, handleOrderCardClicked, children } = props;
    const orderClassName = `order-list ${isOrderActive ? 'order-is-active' : ''}`;


    const handleClick = () => {
        handleOrderCardClicked();
    }

    return (    
        <div className={orderClassName} onClick={handleClick}>
            {children}
        </div>
    )
};
export default Order;