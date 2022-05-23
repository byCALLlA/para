import './App.css';
import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import octocat from './img/octocat.svg'
import followers from './img/followers.svg'
import following from './img/following.svg'

function App() {
    const [user, setUser] = useState('')
    const [repo, setRepo] = useState([])
    const [username, setUsername] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    let fetchGit = (e) => {
        e.preventDefault()
        fetchUser()
        fetchRepo()
    }

    let fetchUser = () => {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(json => setUser(json))
    }

    let fetchRepo = (currentPage) => {
        fetch(`https://api.github.com/users/${username}/repos?per_page=4&page=${currentPage}`)
            .then(response => response.json())
            .then(json => setRepo(json))
    }

    //useEffect(() => console.log(repo))
    //useEffect(() => console.log(currentPage))

        // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 142, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,9, 10, 11, 12, 13, 142, 3, 4, 5, 6, 7, 8, 9, 10, 11,9, 10, 11, 12, 13, 142, 3, 4, 5, 6, 7, 8, 9, 10, 11,99];

   /* function Items({ currentItems }) {
        return (
            <>
                {currentItems &&
                    currentItems.map((item) => (
                        <div>
                            <h3>Item #{item}</h3>
                        </div>
                    ))}
            </>
        );
    } */

    // We start with an empty list of items.
    //const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % user['public_repos'];
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        //console.log(currentItems)
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
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
       // setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(user['public_repos'] / itemsPerPage));
    }, [user, itemOffset, itemsPerPage]);

    /* function PaginatedItems({ itemsPerPage }) {



        // Invoke when user click to request another page.

    } */

    return (
    <div className="App">
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

        {repo.length
            ?<>


                <h2>Repositories({user['public_repos']})</h2>


                <div className="repos-container">  {repo.map((repo) =>
                    <div key={repo.id}>
                    <a href={repo['html_url']} target="_blank" rel="noreferrer" className="repos-name">{repo.name}</a>
                    <div  className="repos-description"> {repo.description}</div></div>  ) }

                </div>
                <h6> {(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + repo.length} of {user['public_repos']} items</h6>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    marginPagesDisplayed={1}
                />
            </>
            : <h2>нет репозиториев</h2>
        }
    </div>
  );
}

export default App;
