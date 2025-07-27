export interface TeamStat {
    team: string;
    win: string;
    draw: string;
    loss: string;
    gf: string;
    ga: string;
    point: string;
}


export type LeagueTable = Array<TeamStat>;
