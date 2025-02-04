import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import NotFound from "./pages/not-found";
import { ConfirmLogin } from "./pages/confirm-login";

export function router() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/confirm-login" Component={ConfirmLogin} />

          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}