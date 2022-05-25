import svg from "../img/Union.svg";

const UserNotFound = () => {
    return (
        <div className="empty-container">
            <img src={svg} alt="Search" />
            <p>User not found</p>
        </div>
    );
}

export default UserNotFound;