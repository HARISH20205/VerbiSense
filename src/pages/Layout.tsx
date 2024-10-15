import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main>
      Verbi Sense
      <Outlet />
    </main>
  );
}
