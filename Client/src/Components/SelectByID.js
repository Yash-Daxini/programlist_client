import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SelectByID = () => {
  const [programObj, setProgramObj] = useState({});

  const params = useParams();
  useEffect(() => {
    // fetch("https://localhost:5001/api/MST_Program/" + params.id)
    fetch(`http://localhost:8000/programs/${params.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
      })
      .catch((e) => {});
  }, [params.id]);
  return (
    <div className="container-fluid my-5">
      <h1 className="my-5">{programObj.program_name}</h1>
      {/* <h5>
        {programObj.issolved ? (
          <span className="text-success">
            {" "}
            <ion-icon name="checkmark-circle-sharp"></ion-icon>{" "}
          </span>
        ) : (
          <span></span>
        )}
      </h5> */}
      <div className="my-5 d-flex justify-content-center align-items-center flex-column">
        <h4 style={{textTransform:"capitalize"}}>Topic : {programObj.program_topic} </h4>
        <hr/>
        {programObj.difficulty === "Easy" ? (
            <h4 className="customBadgeSuccess">
              <span className="fs-6">{programObj.difficulty}</span>
            </h4>
          ) : programObj.difficulty === "Medium" ? (
            <h4 className="customBadgeWarning">
              <span className="fs-6">{programObj.difficulty}</span>
            </h4>
          ) : (
            <h4 className="customBadgeDanger">
              <span className="fs-6">{programObj.difficulty}</span>
            </h4>
          )}
      </div>
      <div className="my-5 d-flex justify-content-center align-items-center">
        <button className="btn btn-outline-primary mx-5">
          <Link
            to={programObj.program_link}
            className="text-decoration-none text-light"
            target={"_blank"}
          >
            Solve Here{" "}
          </Link>
        </button>
        <button className="btn btn-outline-primary mx-5">
          <Link
            to={programObj.solution_link}
            className="text-decoration-none text-light"
            target={"_blank"}
          >
            See Solution{" "}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SelectByID;
