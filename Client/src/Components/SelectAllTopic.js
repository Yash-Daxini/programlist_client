import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SelectAllTopic = () => {
  const [topicObj, setTopicObj] = useState([]);

  useEffect(() => {
    // fetch("https://localhost:5001/api/MST_ProgramTopic")
    fetch("https://programlist-backend.onrender.com/topic")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopicObj(data);
      })
      .catch((e) => {});
  }, []);

  const allTopics = topicObj.map((topic) => {
    return (
      <>
        <div class="cardBox text-center">
          <div class="card">
          <Link className="text-decoration-none" to={`/SelectAllTopic/SelectByTopicName/${topic.topic_name}`}><div class="cardName">{topic.topic_name}</div></Link>
          </div>
        </div>
      </>
    );
  });

  return (
    <div>
      <div className="selectAll container p-5 darkTheme">
        <h1>Topics</h1>
        <div className="cardBox text-center">{allTopics}</div>
      </div>
    </div>
  );
};

export default SelectAllTopic;
