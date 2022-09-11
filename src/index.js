import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";

import { theme } from "./theme";

const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);
root.render(
  <ChakraProvider themes={theme}>
    <App />
  </ChakraProvider>
);
