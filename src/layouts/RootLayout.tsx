import { Outlet } from "react-router";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <div>
      <Header />
      <main style={{ padding: "24px", maxWidth: "960px", margin: "0 auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
