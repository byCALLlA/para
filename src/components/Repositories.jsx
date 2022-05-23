import React from 'react';
import ReactPaginate from "react-paginate";
import prev from "../img/prev.svg";
import next from "../img/next.svg";

const Repositories = ({user, repo, currentPage, itemsPerPage, handlePageClick, pageCount }) => {
    return (
        <div>
            <h1>Repositories({user['public_repos']})</h1>
            <div >  {repo.map((repo) =>
                <div className="repos-container" key={repo.id}>
                    <a href={repo['html_url']} target="_blank" rel="noreferrer" className="repos-name">{repo.name}</a>
                    <div  className="repos-description"> {repo.description}</div></div>  ) }
            </div>
            <div className='pagination-container'>
                <div className="pagination-item"> {(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + repo.length} of {user['public_repos']} items</div>
                <ReactPaginate
                    breakLabel="..."
                    previousLabel={<img src={prev} alt="prev" />}
                    nextLabel={<img src={next} alt="next" />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    marginPagesDisplayed={1}
                    activeClassName="active"
                    previousClassName="page-item prev"
                    nextClassName="page-item next"
                    containerClassName="pagination"
                    pageClassName="page-item"
                    breakClassName="page-item"
                    pageLinkClassName="page-link"
                    initialPage={1}
                />
            </div>

        </div>
    );
};

export default Repositories;