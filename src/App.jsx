import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { store } from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/feed";
import ProtectedRoute from "./components/protectedRoutes";
import PublicRoute from "./components/publicRoutes";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              {/*Public*/}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
              </Route>
              {/*Protected*/}
              <Route element={<ProtectedRoute />}>
                <Route index element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
