import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const SelectByID = () => {
  const [programObj, setProgramObj] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
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
                  <p>{programObj.program_description}</p>

                  <p>
                    Input :{" "}
                    {programObj.program_testcases !== null
                      ? programObj.program_testcases.input
                      : ""}
                  </p>
                  <p>
                    Output :{" "}
                    {programObj.program_testcases !== null
                      ? programObj.program_testcases.output
                      : ""}
                  </p>
                </div>
              </div>
              <div className="compiler mb-5">
                <div data-pym-src="https://www.jdoodle.com/plugin/v0/2e28a111104a265988dbce9b3f71a0ef/2dfd313b1308059a6006df5a0de7cf4e"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container-fluid">
            <div className="d-flex justify-content-center flex-column align-items-center">
              <h1 className="my-5 placeholder-glow w-50">
                <span className="placeholder col-6"></span>
              </h1>
            </div>
            <div className="d-flex justify-content-center flex-wrap gap-4">
              <div className="description">
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <h4 className="fs-3 placeholder-glow w-75">
                    <span className="placeholder col-12"></span>
                  </h4>
                  <hr />
                  <h4 className="placeholder-glow w-25 fs-2">
                    <span className="placeholder col-6"></span>
                  </h4>
                </div>
                <div className="my-5 d-flex flex-column justify-content-center align-items-center">
                  <p className="placeholder-glow fs-6 w-100">
                    <span className="placeholder col-12 my-2"></span>
                    <span className="placeholder col-9 my-2"></span>
                    <span className="placeholder col-6 my-2"></span>
                    <span className="placeholder col-3 my-2 mx-2"></span>
                  </p>

                  <p className="placeholder-glow fs-6 w-100">
                    <span className="placeholder col-3 my-2 mx-2"></span>
                    <span className="placeholder col-3 my-2 mx-2"></span>
                  </p>
                </div>
              </div>
              <div className="bg-dark compiler mb-5" style={{ height: "50vh" }}>
                <div className="placeholder-glow w-100 h-100">
                  <span className="placeholder col-12 h-100"></span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SelectByID;
