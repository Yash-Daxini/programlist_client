import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SelectByTopicName = () => {
  const params = useParams();

  const [progams, setProgams] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    fetch(
      `https://programlist-backend.onrender.com/programs/topics/${params.name}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgams(data);
        setIsLoaded(false);
      })
      .catch((e) => {});
  }, [params.name, params.id]);
  
  const allPrograms = progams.map((program) => {
    return (
      <>
        <tr>
          <td>
            <Link
              to={"../../../SelectAll/SelectByID/" + program._id}
              style={{ textDecoration: "none" }}
            >
              {program.program_name}
            </Link>
          </td>
          <td>{program.program_topic}</td>
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
  return (
    <div className="selectAll container my-5 darkTheme">
      <h1 style={{ textTransform: "capitalize" }}>{params.name}</h1>
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
          {allPrograms.length === 0 && !isLoaded ? (
            <tbody>
              <tr>
                <td colSpan={5}>
                  <h3>No match found</h3>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>{!isLoaded ? allPrograms : allProgramsPlaceholder}</tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default SelectByTopicName;
