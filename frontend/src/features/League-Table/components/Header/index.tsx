import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import style from "./style.module.css";

type LeagueTableHeaderProps = {
  selectedSeason: number | null;
  onSelectSeason: (season: number) => void;
};
const Header = ({ selectedSeason, onSelectSeason }: LeagueTableHeaderProps) => {
  const dropdownMenuItems: Array<number> = [2020, 2021, 2022, 2023, 2024, 2025];

  return (
    <div className={style.container}>
      <div className={style.season_selection}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {selectedSeason
                ? `Selected Season: ${selectedSeason}`
                : "Select Season"}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {dropdownMenuItems.map((item) => (
              <DropdownMenuItem key={item} onClick={() => onSelectSeason(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
