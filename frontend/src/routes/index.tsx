import { Routes, Route } from "react-router";

/*--------------Route components--------------*/
import App from "@/App";
import LeagueTable from "@/features/League-Table";
import GoalStat from "@/features/Goal-Stats";
/*--------------Route components--------------*/
const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/league-table" element={<LeagueTable />} />
      <Route path="/goal-stat" element={<GoalStat />} />
    </Routes>
  );
};

export default AppRoute;
