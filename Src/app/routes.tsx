import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import JuryPanel from "./pages/JuryPanel";
import TeamView from "./pages/TeamView";
import Leaderboard from "./pages/Leaderboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "admin", Component: AdminPanel },
      { path: "jury", Component: JuryPanel },
      { path: "team", Component: TeamView },
      { path: "leaderboard", Component: Leaderboard },
    ],
  },
]);
