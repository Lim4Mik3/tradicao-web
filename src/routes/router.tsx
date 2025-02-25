import { ConfirmLoginPage } from "@/pages/confirm-login";
import { LoginPage } from "@/pages/login";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "@/pages/not-found";
import { PrivateRoute } from "./protected-route";
import { PublicRoute } from "./public-route";
import { SecureConfirmLoginRoute } from "./secure-confirm-login-route";
import { createPortal } from "react-dom";
import { Modal } from "@/components/Modal";
import { DashboardPage } from "@/pages/backoffice/dashboard";
import { GasStationsPage } from "@/pages/backoffice/gas-stations";
import { ROUTES_NAME } from "@/constants/ROUTES_NAME";

export function router() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={ROUTES_NAME.LOGIN} Component={LoginPage} />
          </Route>
          
          <Route element={<SecureConfirmLoginRoute />}>
            <Route path={ROUTES_NAME.CONFIRM_LOGIN} Component={ConfirmLoginPage} />
          </Route>

          <Route path={ROUTES_NAME.BACKOFFICE_PREFIX} element={<PrivateRoute />}>
            <Route path={ROUTES_NAME.DASHBOARD} Component={DashboardPage} />
            <Route path={ROUTES_NAME.GAS_STATIONS} Component={GasStationsPage} />
          </Route>

          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </BrowserRouter>

      {createPortal(<Modal />, document.getElementById('portal-1')!)}
    </StrictMode>
  )
}