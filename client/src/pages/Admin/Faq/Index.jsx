import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from "@mui/material";
import { searchQuestions, sortQuestions } from "../../../redux/slices/faqSlice";
import FaqTableItem from "../../../components/Admin/FaqTableItem/Index";
import { useDataContext } from "../../../context/context";
const FaqAdmin = () => {
  const dispatch = useDispatch();
  const { theme } = useDataContext();

  const { questions, questionsLoading } = useSelector(
    (state) => state.questions
  );
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <main className={`managementAdmin  ${theme ? "" : "tableLight"}`}>
      <Helmet>
        <title>Faq</title>
      </Helmet>
      <div className="managementAdminInside">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 managementTableTop">
              <div className="managementTableTopInside">
                <div className="managementTableTopInsideBox">
                  <div className="managementTableTopBoxFilter">
                    <div className="managementTableTopFilterLeft">
                      <input
                        type="text"
                        placeholder="Search Question"
                        onChange={(e) => {
                          dispatch(searchQuestions(e.target.value));
                        }}
                      />
                    </div>
                    <div className="managementTableTopFilterRight">
                      <select
                        onChange={(e) => {
                          dispatch(sortQuestions(e.target.value));
                        }}
                      >
                        <option hidden disabled value={""} defaultValue={""}>
                          Filter
                        </option>
                        <option value={"df"}>Default</option>
                        <optgroup label="Filter By Team Title">
                          <option value={"A-Z"}>A-Z</option>
                          <option value={"Z-A"}>Z-A</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container container2">
          <div className="row">
            {questionsLoading == true ? (
              <p className="spinnerManagement">
                <RingLoader color="#36d7b7" />
              </p>
            ) : (
              <div className="col-lg-12 managementTableCol">
                <div className="managementTableColInside">
                  <div className="managementTableColInsideBox">
                    <div className="resManagementTable">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Faq Title</th>
                            <th>Faq Type</th>
                            <th>Faq Content</th>
                            <th>Detail</th>
                            <th>Update</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems?.map((item, index) => {
                            return (
                              <FaqTableItem
                                key={index}
                                index={indexOfFirstItem + index}
                                item={item}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="managementPagination"
                      style={{ display: questions.length > 7 ? "" : "none" }}
                    >
                      <Pagination
                        count={Math.ceil(questions.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FaqAdmin;
