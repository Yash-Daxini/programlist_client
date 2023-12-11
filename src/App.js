import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import SelectAll from "./Components/SelectAll";
import SelectByID from "./Components/SelectByID";
import SelectAllTopic from "./Components/SelectAllTopic";
import SelectByTopicName from "./Components/SelectByTopicName";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import "./CSS/Style.css";
import PageNotFound from "./Components/PageNotFound";
import { useEffect } from "react";

function App() {
  const RedirectToSelectByID = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
      navigate(`/programs/program/${id}`, { replace: true });
    }, [navigate,id]);

    return null;
  };
  const RedirectToSelectByTopicName = () => {
    let { name } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
      navigate(`/programs/${name}`, { replace: true });
    }, [navigate,name]);

    return null;
  };

  return (
    <div className="App darkTheme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/SelectAll"
              element={<Navigate to="/programs" replace />}
            />
            <Route path="/programs" element={<SelectAll />} />
            <Route
              path="/programs/SelectByID/:id"
              element={<RedirectToSelectByID />}
            />
            <Route
              path="/programs/program/:id"
              element={<SelectByID />}
            ></Route>
            <Route path="/SelectAllTopic" element={<SelectAllTopic />} />
            <Route
              path="/SelectAllTopic/SelectByTopicName/:name"
              element={<RedirectToSelectByTopicName />}
            />
            <Route
              path="/programs/:name"
              element={<SelectByTopicName />}
            />
            <Route path="*" exact element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
