import React from 'react';
import svg from "../img/Union.svg";
import '../App.css';

const EmptyList = () => {
    return (
        <div className="empty-state">
            <img src={svg} alt="Search icon" className="empty-state__icon"/>
            <p className="empty-state__text">Repository list is empty</p>
        </div>
    );
}

export default EmptyList;