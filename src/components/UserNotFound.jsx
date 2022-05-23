import svg from "../img/Union.svg";
import '../App.css';

const UserNotFound = () => {
    return (
        <div className="state">
            <div className="empty-state">
                <img src={svg} alt="Search" />
                <p>User not found</p>
            </div>
        </div>
    );
}

export default UserNotFound;