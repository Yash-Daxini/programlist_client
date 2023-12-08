import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SelectAll = () => {
  const [programObj, setProgramObj] = useState([]);
  const [filterObj, setFilterObj] = useState({
    program_topic: "all",
    difficulty: "all",
  });
  const [filterdData, setFilteredData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // setTimeout(() => {
    fetchPrograms();
    // }, 4000);
  }, [isLoaded]);

  const fetchPrograms = async () => {
    await fetch("https://programlist-backend.onrender.com/programs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
        setFilteredData(data);
        setIsLoaded(true);
      })
      .catch((e) => {});
  };
  const allPrograms = filterdData.map((program) => {
    return (
      <>
        <tr>
          <td>
            <Link
              to={"./SelectByID/" + program._id}
              style={{ textDecoration: "none" }}
            >
              {program.program_name}
            </Link>
          </td>
          <td style={{ textTransform: "capitalize" }}>
            {program.program_topic}
          </td>
          <td>
            <Link to={program.program_link} target="_blank">
              <ion-icon name="link-outline"></ion-icon>
            </Link>
          </td>
          <td>
            <Link to={program.program_solutionLink} target="_blank">
              <ion-icon name="link-outline"></ion-icon>
            </Link>
          </td>
          {program.difficulty === "Easy" ? (
            <td className="customBadgeSuccess">
              <span>{program.difficulty}</span>
            </td>
          ) : program.difficulty === "Medium" ? (
            <td className="customBadgeWarning">
              <span>{program.difficulty}</span>
            </td>
          ) : (
            <td className="customBadgeDanger">
              <span>{program.difficulty}</span>
            </td>
          )}
        </tr>
      </>
    );
  });

  let allProgramsPlaceholder = [];
  for (let i = 0; i < 9; i++) {
    allProgramsPlaceholder.push(
      <tr>
        <td className="placeholder-glow">
          <span className="placeholder col-6"></span>
        </td>
        <td className="placeholder-glow">
          <span className="placeholder col-6"></span>
        </td>
        <td className="placeholder-glow">
          <span className="placeholder col-6"></span>
        </td>
        <td className="placeholder-glow">
          <span className="placeholder col-6"></span>
        </td>
        <td className="placeholder-glow">
          <span className="placeholder col-6"></span>
        </td>
      </tr>
    );
  }

  const topicsSet = new Set();

  programObj.forEach((obj) => {
    topicsSet.add(obj.program_topic);
  });

  let topicsArray = [];

  topicsSet.forEach((element) => {
    topicsArray.push(element);
  });

  const allTopicsName = topicsArray.map((topic) => {
    return (
      <>
        <option>{topic}</option>
      </>
    );
  });

  const allTopics = topicsArray.map((topic) => {
    return (
      <>
        <div className="text-center my-4">
          <Link
            className="text-decoration-none cardNumber"
            to={`/SelectAllTopic/SelectByTopicName/${topic}`}
            target="_blank"
          >
            <div className="programPageTopics">
              <div
                className="cardName"
                style={{ textTransform: "capitalize", letterSpacing: "1px" }}
              >
                {topic}
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  });

  let allTopicsPlaceholder = [];
  for (let i = 0; i < 9; i++) {
    allTopicsPlaceholder.push(
      <div className="text-center placeholder-glow topicsNamePlaceholder">
        <span className="placeholder w-100 h-100"></span>
      </div>
    );
  }

  return (
    <div className="selectAll container-sm darkTheme p-2 mt-2">
      <div className="mb-5">
        <button
          class="btn btn-outline-light fs-5 p-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Find Topics Here
        </button>

        <div
          class="offcanvas offcanvas-start bg-dark text-white"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header text-center">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">
              Topics
            </h5>
            <button
              type="button"
              class="btn-close text-white bg-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            {isLoaded.toString() === "false" ? allTopicsPlaceholder : allTopics}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <h1>Programs</h1>
        </div>
        <div className="d-flex justify-content-center w-50">
          {isLoaded.toString() === "false" ? (
            <>
              <div className="placeholder-glow form-control m-2 dropdown w-100 placeholderOfDropdown">
                <span className="placeholder w-100 h-100"></span>
              </div>
              <div className="placeholder-glow form-control m-2 dropdown w-100 placeholderOfDropdown">
                <span className="placeholder w-100 h-100"></span>
              </div>
            </>
          ) : (
            <>
              <select
                className="form-control m-2 dropdown d-inline-flex focus-ring focus-ring-light py-1 px-2 text-decoration-none"
                value={filterObj.program_topic}
                onChange={(e) => {
                  setFilterObj({ ...filterObj, program_topic: e.target.value });

                  if (
                    e.target.value === "all" &&
                    filterObj.difficulty === "all"
                  ) {
                    setFilteredData(programObj);
                  } else if (e.target.value === "all") {
                    setFilteredData(
                      programObj.filter(
                        (program) => program.difficulty === filterObj.difficulty
                      )
                    );
                  } else if (filterObj.difficulty === "all") {
                    setFilteredData(
                      programObj.filter(
                        (program) => program.program_topic === e.target.value
                      )
                    );
                  } else {
                    setFilteredData(
                      programObj.filter(
                        (program) =>
                          program.program_topic === e.target.value &&
                          program.difficulty === filterObj.difficulty
                      )
                    );
                  }
                }}
              >
                <option value={"all"}>Select Topic Name</option>
                {allTopicsName}
              </select>
              <select
                className="form-control m-2 dropdown d-inline-flex focus-ring focus-ring-light py-1 px-2 text-decoration-none"
                value={filterObj.difficulty}
                onChange={(e) => {
                  setFilterObj({
                    ...filterObj,
                    difficulty: e.target.value,
                  });
                  if (
                    e.target.value === "all" &&
                    filterObj.program_topic === "all"
                  ) {
                    setFilteredData(programObj);
                  } else if (e.target.value === "all") {
                    setFilteredData(
                      programObj.filter(
                        (program) =>
                          program.program_topic === filterObj.program_topic
                      )
                    );
                  } else if (filterObj.program_topic === "all") {
                    setFilteredData(
                      programObj.filter(
                        (program) => program.difficulty === e.target.value
                      )
                    );
                  } else {
                    setFilteredData(
                      programObj.filter(
                        (program) =>
                          program.difficulty === e.target.value &&
                          program.program_topic === filterObj.program_topic
                      )
                    );
                  }
                }}
              >
                <option value={"all"}>Select Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </>
          )}
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Topic</th>
              <th scope="col">Program Link</th>
              <th scope="col">Solution Link</th>
              <th scope="col">Difficulty</th>
            </tr>
          </thead>
          {allPrograms.length === 0 && isLoaded ? (
            <tbody>
              <tr>
                <td colSpan={5}>
                  <h3>No match found</h3>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>{isLoaded ? allPrograms : allProgramsPlaceholder}</tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default SelectAll;
