// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";

// // Theme is now handled entirely by the ThemeProvider component

// // Safer root element handling
// const rootElement = document.getElementById("root");
// if (rootElement) {
//   createRoot(rootElement).render(<App />);
// } else {
//   console.error("Root element not found! Mounting failed.");
// }

import { Platform } from "react-native";
import { registerRootComponent } from "expo";
import App from "./App";

if (Platform.OS === "web") {
  import("react-dom").then(({ createRoot }) => {
    if (typeof document !== "undefined") {
      const rootElement = document.getElementById("root");
      if (rootElement) {
        createRoot(rootElement).render(<App />);
      }
    }
  });
} else {
  registerRootComponent(App);
}
