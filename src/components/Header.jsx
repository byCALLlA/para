import React from 'react'
import octocat from "../img/octocat.svg"

const Header = ({username, setUsername, fetchGit}) => {
    return (
        <div className="header-container">
            <img className="header-logo" src={octocat} alt="octocat" />
            <form className="form-container" onSubmit={fetchGit}>

                <input
                    id="search"
                    type="text"
                    placeholder={'Enter GitHub username and press Enter'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Header;