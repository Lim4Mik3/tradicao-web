import { ConfirmLoginPage } from "@/pages/confirm-login";
import { LoginPage } from "@/pages/login";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "@/pages/dashboard";
import NotFoundPage from "@/pages/not-found";
import { PrivateRoute } from "./protected-route";
import { PublicRoute } from "./public-route";
import { SecureConfirmLoginRoute } from "./secure-confirm-login-route";
import { createPortal } from "react-dom";
import { Modal } from "@/components/Modal";

export function router() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" Component={LoginPage} />
          </Route>
          
          <Route element={<SecureConfirmLoginRoute />}>
            <Route path="/confirm-login" Component={ConfirmLoginPage} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" Component={DashboardPage} />
          </Route>

          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </BrowserRouter>

      {createPortal(<Modal />, document.getElementById('portal-1')!)}
    </StrictMode>
  )
}