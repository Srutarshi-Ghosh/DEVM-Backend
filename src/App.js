import "./App.css";
import GetStarted from "./Pages/GetStarted";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "web3uikit";
import { RecoilRoot } from "recoil";
import Pending from "./Pages/Pending";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <NotificationProvider>
          <Router>
            <div>
              <Routes>
                <Route path="/pending" element={<Pending />} />
                <Route path="/" index element={<GetStarted />} />
              </Routes>
            </div>
          </Router>
        </NotificationProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
