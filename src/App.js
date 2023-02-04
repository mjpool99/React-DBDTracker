import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext';
import RootLayout from "./components/RootLayout";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthorizedUser from "./components/auth/AuthorizedUser";
import ForgotPassword from "./components/auth/ForgotPassword";
import SurvivorTracker from "./components/dashboard/SurvivorTracker";
import KillerTracker from "./components/dashboard/KillerTracker";
import { Suspense } from 'react';

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Dashboard" element={<AuthorizedUser />}>
          <Route index element={<SurvivorTracker />} />
          <Route path="KillerTracker" element={<KillerTracker />} />
        </Route>
      </Route>
    ));
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </div>
  );
}

export default App;
