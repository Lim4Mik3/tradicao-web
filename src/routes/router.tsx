import { ConfirmLoginPage } from "@/pages/confirm-login";
import { LoginPage } from "@/pages/login";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { DashboardPage } from "@/pages/dashboard";
import NotFoundPage from "@/pages/not-found";

export function router() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={LoginPage} />
          <Route path="/confirm-login" Component={ConfirmLoginPage} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" Component={DashboardPage} />
          </Route>

          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}