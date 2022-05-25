import search from '../img/search.svg'

const InitialState = () => {
    return (
        <div className="empty-container">
                <img src={search} alt="Search icon" className="empty-container-img"/>
                <p className="empty-container-text">Start with searching <br/>
                    a GitHub user</p>
        </div>
    );
}

export default InitialState;