import React from 'react';
import svg from "../img/empty.svg";
import '../App.css';

const EmptyList = () => {
    return (
        <div className="empty-repo-container">
            <img src={svg} alt="Search icon" className="empty-state-img"/>
            <p className="empty-container-text">Repository list is empty</p>
        </div>
    );
}

export default EmptyList;