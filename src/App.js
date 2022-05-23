import './App.css';
import {useEffect, useState} from "react";
import InitialState from "./components/InitialState";
//import UserNotFound from "./components/UserNotFound";
import EmptyList from "./components/EmptyList";
import Header from "./components/Header";
//import Loader from "./components/Loader";
import User from "./components/User";
import Repositories from "./components/Repositories";

function App() {
    const [initialState, setInitialState] = useState(true)
    //const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState('')
    const [repo, setRepo] = useState([])
    const [username, setUsername] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const fetchGit = (e) => {
        e.preventDefault()
        if (username !== '') {
            fetchUser()
            fetchRepo()
            setInitialState(false)
        }
    }

    const fetchUser = () => {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(json => setUser(json))
    }

    const fetchRepo = (currentPage) => {
        setIsLoaded(true)
        fetch(`https://api.github.com/users/${username}/repos?per_page=4&page=${currentPage}`)
            .then(response => response.json())
            .then(json => setRepo(json))
        setIsLoaded(false)
    }

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4)
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % user['public_repos'];
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
        setCurrentPage(event.selected + 1)
        fetchRepo(event.selected + 1)
    };

    const checkNum = (num) => {
        if (num >= 1000) {
            return `${parseFloat((num/1000).toFixed(1))}k`
        } else {
            return num
        }
    }

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setPageCount(Math.ceil(user['public_repos'] / itemsPerPage));
    }, [user, itemOffset]);

    return (
    <div className="App">
        <Header
            username={username}
            setUsername={setUsername}
            fetchGit={fetchGit}
        />

        {
            initialState
            ?   <InitialState/>
            :   <div className="user-container">
                    <User
                        user={user}
                        checkNum={checkNum}
                    />
                    {repo.length
                        ?<div>
                            <Repositories
                                user={user}
                                repo={repo}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                handlePageClick={handlePageClick}
                                pageCount={pageCount}
                            />
                        </div>
                        :   <EmptyList />
                    }
                </div>
        }
    </div>
    );
}

export default App;
