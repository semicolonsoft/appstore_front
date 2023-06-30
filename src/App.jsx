import React, { createContext } from "react";

import AppRoutes from "./routes/Routes";
import { AuthProvider } from "./components/AuthProvider";
import Layout from "./components/Layout";
import { BrowserRouter as Router } from "react-router-dom";

export const AuthContext = createContext();
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
