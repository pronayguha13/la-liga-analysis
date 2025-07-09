import { useEffect, useMemo, useState } from "react";

import TableView from "@/components/TableView";
import { getSeasonWiseGoalStat } from "@/features/Goal-Stats/service";
const GoalStat = () => {
  const [seasonWiseGoalData, setSeasonWiseGoalData] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchSeasonWiseGoalData = async () => {
      const data = await getSeasonWiseGoalStat();

      setSeasonWiseGoalData(data);
    };

    fetchSeasonWiseGoalData();
  }, []);

  const columns = useMemo(() => {
    if (seasonWiseGoalData.length) {
      const row = seasonWiseGoalData[0];

      return Object.keys(row);
    } else {
      return [];
    }
  }, [seasonWiseGoalData]);

  return (
    <TableView
      title="Season wise goal stat"
      data={seasonWiseGoalData}
      columns={columns}
    />
  );
};

export default GoalStat;
