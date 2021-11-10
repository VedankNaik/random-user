import React, { useState, useEffect } from "react";
import "./Users.css";
import ReactPaginate from "react-paginate";

export default function Users() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isAuth, setisAuth] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);

  const userPerPage = 5;
  const pagesVisited = pageNumber * userPerPage;

  const displayUsers = Object.keys(userList)
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((user) => (
      <div className="Box" key={userList[user].id}>
        <div className="Picture">
          <div className="PhotoBox">
            <img className="ImgAlign" src={userList[user].picture.large}></img>
          </div>
        </div>
        <div className="Vertical"></div>
        <div className="Details">
          <div className="User">
            <p>
              {userList[user].name.title} {userList[user].name.first}{" "}
              {userList[user].name.last}
            </p>
            <p>{userList[user].email}</p>
            <p>
              {userList[user].location.street.number}{" "}
              {userList[user].location.street.name}{" "}
              {userList[user].location.city} {userList[user].location.state}{" "}
              {userList[user].location.country}{" "}
              {userList[user].location.postcode}
            </p>
          </div>
        </div>
      </div>
    ));

  const pageCount = Math.ceil(Object.keys(userList).length / userPerPage);

  const handlePageClick = ({selected}) => {
    setPageNumber(selected);
  }

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => setUserList({ ...data.results }))
      .then(setisLoading(false));
  }, []);

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className="App">
      <div className="Header">
        User List
        <button className="LogoutButton" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="TopMargin" />
      {console.log(userList)}
      {/* {console.log(userList)} */}

      {isLoading ? (
        <div>
          {" "}
          <span>Loading...</span>{" "}
        </div>
      ) : (
        <div>
          {displayUsers}
          <div className="Pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={"paginationButton"}
            previousLinkClassName={"prevButton"}
            nextLinkClassName={"nextButton"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
          </div>
        </div>  
      )}
      <div className="Footer">
        <p>Frontend Developer</p>
      </div>
    </div>
  );
}
