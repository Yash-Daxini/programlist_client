import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SelectAll from "./Components/SelectAll";
import SelectByID from "./Components/SelectByID";
import SelectAllTopic from "./Components/SelectAllTopic";
import SelectByTopicName from "./Components/SelectByTopicName";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import './CSS/Style.css'

function App() {
  return (
    <div className="App darkTheme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/SelectAll" element={<SelectAll />} />
            <Route path='/SelectAll/SelectByID/:id' element={<SelectByID />} ></Route>
            <Route path='/SelectAllTopic' element={<SelectAllTopic />} />
            <Route path='/SelectAllTopic/SelectByTopicName/:name' element={<SelectByTopicName />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
