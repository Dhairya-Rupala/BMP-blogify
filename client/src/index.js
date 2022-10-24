import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextProvider } from "./context/Context";
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import { ToasterContainer } from 'baseui/toast';

const engine = new Styletron();

ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <ContextProvider>
          <ToasterContainer autoHideDuration={3000}/>
      <App />
        </ContextProvider>
         </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
