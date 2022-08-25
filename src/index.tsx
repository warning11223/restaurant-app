import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import {Provider} from "react-redux";
import {persistor, store} from "./state";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <AnimatePresence exitBeforeEnter>
          <BrowserRouter>
              <Provider store={store}>
                  <PersistGate persistor={persistor} loading={null}>
                      <App />
                  </PersistGate>
              </Provider>
          </BrowserRouter>
      </AnimatePresence>
  </React.StrictMode>
);
