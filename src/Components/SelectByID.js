import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const SelectByID = () => {
  const [programObj, setProgramObj] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  // const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    fetch(`https://programlist-backend.onrender.com/programs/${params.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
        setIsLoading(false);
      })
      .catch((e) => {});
  }, [params.id]);

  const scriptRef = useRef(null);

  useEffect(() => {
    const handleLoad = () => {
      if (!scriptRef.current && !isLoading) {
        const script = document.createElement("script");
        script.src = "https://www.jdoodle.com/assets/jdoodle-pym.min.js";
        script.async = true;

        document.body.appendChild(script);
        scriptRef.current = script;
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    }
  }, [location.key, isLoading]);

  



  return (
    <>
      {!isLoading ? (
        <>
          <div className="container-fluid">
            <h1 className="my-5 fs-3">{programObj.program_name}</h1>
            <div className="d-flex justify-content-center flex-wrap gap-4">
              <div className="description">
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <h4 className="fs-5">Topic : {programObj.program_topic} </h4>
                  <hr />
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
                <div className="my-5 d-flex flex-column justify-content-center align-items-center">
                  {/* <button className="btn btn-outline-primary mx-5">
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
        </button> */}
                  <p>{programObj.program_description}</p>

                  <p>
                    Input : {" "}
                    {programObj.program_testcases !== null
                      ?  programObj.program_testcases.input
                      : ""}
                  </p>
                  <p>
                    Output : {" "}
                    {programObj.program_testcases !== null
                      ?  programObj.program_testcases.output
                      :  ""}
                  </p>
                </div>
              </div>
              <div className="bg-dark compiler mb-5">
                <div className="comp bg-dark text-white" data-pym-src="https://www.jdoodle.com/plugin/v0/2e28a111104a265988dbce9b3f71a0ef/2dfd313b1308059a6006df5a0de7cf4e?stdin=0&arg=0"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SelectByID;
