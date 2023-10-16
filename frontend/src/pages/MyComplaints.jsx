import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "../UI/Alert";
import Hero from "../UI/Hero";
import classes from "./MyComplaints.module.css";
import PaginationHandler from "../UI/PaginationHandler";
import useHTTP from "../hooks/useHttp";
import Loading from "../UI/Loading";
import StatusFormatter from "../UI/StatusFormatter";
import DateFormatter from "../UI/DateFormatter";

const MyComplaints = () => {
  const [userComplaints, setUserComplaints] = useState([]);
  const { isLoading, error, sendRequest: getCategories } = useHTTP();

  const dataHandler = useCallback((data) => {
    setUserComplaints(data);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/login");
    }

    getCategories(
      {
        url: "http://localhost:80/cms-api/getUserComplaints.php",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: localStorage.getItem("id"),
      },
      dataHandler
    );
  }, [navigate, getCategories, dataHandler]);

  let { page: currentPage } = useParams();
  const elementsPerPage = 10;
  const start = (currentPage - 1) * elementsPerPage;
  const end = start + elementsPerPage;

  if (isLoading) {
    return (
      <>
        <Hero title="My Complaints" />
        <section className="complaints text-center">
          <Loading />
        </section>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Hero title="My Complaints" />
        <section className="complaints text-center">{error}</section>
      </>
    );
  }
  return (
    <>
      <Hero title="My Complaints" />
      <section className="complaints px-3 px-sm-0">
        <div className="container">
          <div className="row">
            <Alert path="/create-complaint" icon>
              Need help? create a new complaint from here.
            </Alert>
          </div>

          {userComplaints.slice(start, end).map((complaint) => (
            <div
              key={complaint.id}
              className={`${classes.complaint} mb-3 text-muted`}
            >
              <Link to={`/complaint/${complaint.id}`}>
                <div className="row align-items-center">
                  <div className="col-5 ps-0 text-left">
                    <i className="fa-regular fa-envelope pe-3"></i>
                    <p className="d-inline-block complaint-name">
                      {complaint.title}
                    </p>
                  </div>
                  <div className="col-2">
                    <p className="complaint-category">
                      {complaint.categoryName}
                    </p>
                  </div>
                  <div className="col-3">
                    <p className="complaint-date-created">
                      <DateFormatter date={complaint.date_created} />
                    </p>
                  </div>
                  <div className="col-2 pe-0 text-right">
                    <p className="complaint-status">
                      <StatusFormatter status={complaint.status} />
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          <PaginationHandler
            currentPage={currentPage}
            elementsPerPage={elementsPerPage}
            dataLength={userComplaints.length}
          />
        </div>
      </section>
    </>
  );
};

export default MyComplaints;
