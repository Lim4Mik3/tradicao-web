import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfirmLogin } from "./pages/confirm-login";
import { FaleConoscoPage } from "./pages/FaleConosco";
import { HomePage } from "./pages/Home";
import { InstitucionalPage } from "./pages/Institucional";
import { Login } from "./pages/login";
import NotFound from "./pages/not-found";

export function router() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/confirm-login" Component={ConfirmLogin} />

          <Route path="*" Component={NotFound} />

          <Route path="institucional" element={<InstitucionalPage />} />
          <Route path="fale-conosco" element={<FaleConoscoPage />} />
          <Route path="" element={<HomePage />} />


        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}