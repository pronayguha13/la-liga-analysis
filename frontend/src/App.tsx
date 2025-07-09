import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const App = () => {
  return (
    <div className="flex flex-col">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        La-Liga Analysis
      </h1>
      <div className="flex flex-row justify-center gap-4">
        <Button variant="outline" size="lg" className="cursor-pointer" asChild>
          <Link to="/league-table">Get league table</Link>
        </Button>
        <Button variant="outline" size="lg" className="cursor-pointer" asChild>
          <Link to="/goal-stat">Get season wise goal stat</Link>
        </Button>
      </div>
    </div>
  );
};

export default App;
