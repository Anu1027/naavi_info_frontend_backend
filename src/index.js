import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./static/master.scss";
import MainContextProvider from "./context/Context";
import AppContextProvider from "./context/AppContext";
import { GlobalContexProvider } from "./globalContext";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});
root.render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <MainContextProvider>
        <React.StrictMode>
          <GlobalContexProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </GlobalContexProvider>
        </React.StrictMode>
      </MainContextProvider>
    </AppContextProvider>
  </QueryClientProvider>
);
