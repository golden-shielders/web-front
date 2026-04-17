import { Outlet } from "react-router";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
