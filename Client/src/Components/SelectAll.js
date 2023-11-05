import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SelectAll = () => {
  const [programObj, setProgramObj] = useState([]);
  // const [topicObj, setTopicObj] = useState([]);
  const [filterObj, setFilterObj] = useState({
    program_topic: "all",
    difficulty: "all",
  });
  const [filterdData, setFilteredData] = useState([]);

  useEffect(() => {
    // fetch("https://localhost:5001/api/MST_Program")
    fetch("http://localhost:8000/programs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
        setFilteredData(data);
        console.warn(data);
        // setTopicObj(data.program_topic);
      })
      .catch((e) => {});
  }, []);

  // useEffect(() => {
  //   fetch(`https://localhost:5001/api/MST_ProgramTopic/`)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //     })
  //     .catch((e) => {});
  // }, []);

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
        <div className="text-center">
          <div className="programPageTopics">
            <Link
              className="text-decoration-none cardNumber"
              to={`/SelectAllTopic/SelectByTopicName/${topic}`}
            >
              <div className="cardName"style={{textTransform:"capitalize",letterSpacing:"1px"}}>{topic}</div>
            </Link>
          </div>
        </div>
      </>
    );
  });

  /* Filter Using API calls */
  // const fetchUsingFilter = (program_topic, difficulty) => {
  //   // console.warn(program_topic + " " + difficulty);
  //   fetch(
  //     `https://localhost:5001/api/MST_Program/getByFilter/${program_topic}/${difficulty}`
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setProgramObj(data);
  //       filterObj.program_topic = program_topic;
  //       filterObj.difficulty = difficulty;
  //     })
  //     .catch((e) => {});
  // };

  return (
    <div className="selectAll container-sm darkTheme p-5">
      <div>
        <div className="selectAll container p-5 darkTheme">
          {/* <h1>Topics</h1> */}
          <div className="text-center d-flex gap-5 flex-wrap">{allTopics}</div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <h1>Programs</h1>
        </div>
        <div className="d-flex justify-content-center w-50">
          <select
            className="form-control m-2"
            value={filterObj.program_topic}
            onChange={(e) => {
              // console.warn(filterObj.program_topic + " " + e.target.value);
              setFilterObj({ ...filterObj, program_topic: e.target.value });
              // setTimeout(() => {
              if (e.target.value === "all" && filterObj.difficulty === "all") {
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
              // console.warn(filterObj.program_topic);
              // }, 3000);
              // console.warn(filterdData);
              // fetchUsingFilter(e.target.value, filterObj.difficulty);
            }}
          >
            <option value={"all"}>Select Topic Name</option>
            {allTopicsName}
          </select>
          <select
            className="form-control m-2"
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
              // fetchUsingFilter(filterObj.program_topic, e.target.value);
            }}
          >
            <option value={"all"}>Select Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          {/* <button
            className="btn btn-outline-success h-75 m-2"
            onClick={(e) => {
              fetchUsingFilter(filterObj.program_topic,filterObj.difficulty);
            }}
          >
            Search
          </button> */}
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
          {allPrograms.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={5}>
                  <h3>No match found</h3>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>{allPrograms}</tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default SelectAll;
