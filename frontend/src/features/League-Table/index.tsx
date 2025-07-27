import { useEffect, useMemo, useState } from "react";
import { Fragment } from "react/jsx-runtime";

import Header from "@/features/League-Table/components/Header";
import TableView from "@/components/TableView";
import { fetchLegueTable } from "@/features/League-Table/services";

/*-------Type Import-------*/
import { type LeagueTable } from "@/features/League-Table/types";
import type { ITableRow } from "@/types";
/*-------Type Import-------*/

const LeagueTable = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  const [selectedSeasonTableData, setSelectedSeasonTableData] = useState<LeagueTable>(
    []
  );

  const onSelectSeason = (season: number) => {
    console.log("clicked", season);
    setSelectedSeason(season);
  };

  useEffect(() => {
    const getLeagueTable = async () => {
      const response = await fetchLegueTable(selectedSeason);
      console.log("🚀 ~ useEffect ~ response:", response);
      setSelectedSeasonTableData(response);
    }

    getLeagueTable();
  }, [selectedSeason]);
  const columns = useMemo(() => {
    if (
      Array.isArray(selectedSeasonTableData) &&
      selectedSeasonTableData.length
    ) {
      const row = selectedSeasonTableData[0];

      return Object.keys(row);
    } else {
      return Object.keys(selectedSeasonTableData);
    }
  }, [selectedSeasonTableData]);

  return (
    <Fragment>
      <Header selectedSeason={selectedSeason} onSelectSeason={onSelectSeason} />
      <TableView
        title={`League Table for season ${selectedSeason}`}
        data={selectedSeasonTableData as unknown as ITableRow[]}
        columns={columns}
      />
    </Fragment>
  );
};

export default LeagueTable;
