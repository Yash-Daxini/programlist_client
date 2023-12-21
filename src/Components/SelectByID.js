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
                  <div className="d-flex justify-content-center align-items-center gap-5">
                    <h4 className="fs-6">{programObj.program_topic}</h4>
                    {programObj.difficulty === "Easy" ? (
                      <span className="customBadgeSuccess">
                        <span className="fs-6">{programObj.difficulty}</span>
                      </span>
                    ) : programObj.difficulty === "Medium" ? (
                      <span className="customBadgeWarning">
                        <span className="fs-6">{programObj.difficulty}</span>
                      </span>
                    ) : (
                      <span className="customBadgeDanger">
                        <span className="fs-6">{programObj.difficulty}</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="my-5 d-flex flex-column justify-content-center align-items-start gap-3">
                  <p>{programObj.program_description}</p>
                  <h5>
                    <span class="badge p-2" style={{ background: "#555" }}>
                      Input :{" "}
                      {programObj.program_testcases !== null
                        ? programObj.program_testcases.input
                        : ""}
                    </span>
                  </h5>
                  <h5>
                    <span class="badge p-2" style={{ background: "#555" }}>
                      Output :{" "}
                      {programObj.program_testcases !== null
                        ? programObj.program_testcases.output
                        : ""}
                    </span>
                  </h5>
                </div>
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div
                    className="accordion-item text-white"
                    style={{ background: "#444", border: "5px solid #444" }}
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button text-white collapsed"
                        style={{ background: "#444" }}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        Solution
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse text-white"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body text-white">
                        <div
                          className="mb-4 mt-0 p-1 text-center border border-1"
                          style={{ width: "60px" }}
                        >
                          <code className="fs-5">Java</code>
                        </div>
                        <hr></hr>
                        <pre>{programObj.program_solution}</pre>
                      </div>
                    </div>
                  </div>
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
                <div
                  className="accordion accordion-flush placeholder-glow my-4"
                  id="accordionFlushExample"
                >
                  <span
                    className="placeholder col-12"
                    style={{ height: "50px" }}
                  ></span>
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
