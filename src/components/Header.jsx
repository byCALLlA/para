import React from 'react'
import octocat from "../img/octocat.svg"

const Header = ({username, setUsername, fetchGit}) => {
    return (
        <div className="header-container">
            <form className="form-container" onSubmit={fetchGit}>
                <img className="header-logo" src={octocat} alt="octocat" />
                <input
                    id="search"
                    type="text"
                    placeholder={'введите имя'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Header;