import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppToaster from "./components/common/AppToaster.jsx";
import { store } from "./redux/store.js";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import TokenExpiryWatcher from "./components/common/TokenExpiryWatcher.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <TokenExpiryWatcher />
        <App />
      </ErrorBoundary>
      <AppToaster />
    </BrowserRouter>
  </Provider>,
);
