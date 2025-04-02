import { Modal } from "@/components/Modal";
import { ROUTES_NAME } from "@/constants/ROUTES_NAME";
import { CreateGasStationPage } from "@/pages/backoffice/create-gas-station";
import { CreateResourcePage } from "@/pages/backoffice/create-resource";
import { DashboardPage } from "@/pages/backoffice/dashboard";
import { EditResourcePage } from "@/pages/backoffice/edit-resource";
import { GasStationsPage } from "@/pages/backoffice/gas-stations";
import ProfilePage from "@/pages/backoffice/profile";
import { ResourcesPage } from "@/pages/backoffice/resources";
import { ConfirmLoginPage } from "@/pages/confirm-login";
import { FaleConoscoPage } from "@/pages/FaleConosco";
import { HomePage } from "@/pages/Home";
import { InstitucionalPage } from "@/pages/Institucional";
import { LoginPage } from "@/pages/login";
import { PostosPage } from "@/pages/Postos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createPortal } from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./protected-route";
import { PublicRoute } from "./public-route";
import { SecureConfirmLoginRoute } from "./secure-confirm-login-route";

const NavigateAllNotFoundPageToHome = () => <Navigate to="/login" replace />

export const queryClient = new QueryClient()

export function router() {
  return (
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path={ROUTES_NAME.LOGIN} Component={LoginPage} />
              <Route path={ROUTES_NAME.HOME} Component={HomePage} />
              <Route path={ROUTES_NAME.CONTATO} Component={FaleConoscoPage} />
              <Route path={ROUTES_NAME.INSTITUTIONAL} Component={InstitucionalPage} />
              <Route path={ROUTES_NAME.POSTOS} Component={PostosPage} />
            </Route>

            <Route element={<SecureConfirmLoginRoute />}>
              <Route path={ROUTES_NAME.CONFIRM_LOGIN} Component={ConfirmLoginPage} />
            </Route>

            <Route path={ROUTES_NAME.BACKOFFICE_PREFIX} element={<PrivateRoute />}>
              <Route path={ROUTES_NAME.DASHBOARD} Component={DashboardPage} />
              <Route path={ROUTES_NAME.GAS_STATIONS} Component={GasStationsPage} />
              <Route path={ROUTES_NAME.CREATE_GAS_STATION} Component={CreateGasStationPage} />
              <Route path={ROUTES_NAME.PROFILE} Component={ProfilePage} />
              <Route path={ROUTES_NAME.RESOURCES} Component={ResourcesPage} />
              <Route path={ROUTES_NAME.CREATE_RESOURCE} Component={CreateResourcePage} />
              <Route path={ROUTES_NAME.EDIT_RESOURCE} Component={EditResourcePage} />
            </Route>

            <Route path="*" Component={NavigateAllNotFoundPageToHome} />
          </Routes>
        </BrowserRouter>

        {createPortal(<Modal />, document.getElementById('portal-1')!)}
      </StrictMode>
    </QueryClientProvider>
  )
}