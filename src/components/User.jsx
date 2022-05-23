import React from 'react';
import followers from "../img/followers.svg";
import following from "../img/following.svg";

const User = ({user, checkNum}) => {
    return (
        <div className="data-container">
            <img  className="avatar" alt='Avatar' src={user['avatar_url']}/>
            <h1 className="username">{user.name}</h1>
            <a href={user['html_url']} className="userlink" target="_blank" rel="noreferrer">{user.login}</a>
            <div className="follow-container">
                <div className="followers">
                    <img className="icon" src={followers} alt="followers"></img>
                    {checkNum(user.followers)} followers
                </div>
                <div className="following">
                    <img className="icon" src={following} alt="following"></img>
                    {checkNum(user.following)} following
                </div>
            </div>
        </div>
    );
};

export default User;