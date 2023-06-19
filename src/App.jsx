import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  return (
    <Provider store={store}>
      <Suspense
        fallback={
          <div className="loading-pane">
            <h2 className="loader">🐶</h2>
          </div>
        }
      >
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/" element={<SearchParams />}></Route>
          <Route path="/details/:id" element={<Details />}></Route>
        </Routes>
      </Suspense>
    </Provider>
  );
};

export default App;
