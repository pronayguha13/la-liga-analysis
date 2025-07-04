import pandas as pd
import os


def get_team_stat(team_data, team, complete_df):
    win_count = team_data["result"][team_data["result"] == "W"].shape[0]
    draw_count = team_data["result"][team_data["result"] == "D"].shape[0]
    loss_count = team_data["result"][team_data["result"] == "L"].shape[0]
    total_gf = team_data["gf"].sum()
    total_ga = team_data["ga"].sum()
    point = (win_count * 3) + (draw_count * 1)
    team_df = pd.DataFrame(
        data=[[team, win_count, draw_count, loss_count, total_gf, total_ga, point]],
        columns=complete_df.columns,
    )
    complete_df = pd.concat([complete_df, team_df], ignore_index=True)

    # file_path = team + ".csv"
    # if os.path.exists(file_path):
    #     team_df.to_csv(file_path, index=False)
    # else:
    #     team_df.to_csv(file_path, mode="a", header=False, index=False)
    return complete_df


def get_team_wise_stat(season_data, season):
    team_stat_df = pd.DataFrame(
        columns=["team", "win", "draw", "loss", "gf", "ga", "point"]
    )
    team_group = season_data.groupby("team")
    teams = team_group.indices.keys()
    for team in teams:
        team_data = team_group.get_group(team)
        temp_df = get_team_stat(team_data, team, team_stat_df)
        team_stat_df = temp_df
    team_stat_df["Position"] = team_stat_df["point"].rank(method="max", ascending=False)
    team_stat_df.sort_values(by="Position", inplace=True)
    team_stat_df["Position"] = team_stat_df["Position"].astype("int8")
    team_stat_df.set_index("Position", inplace=True)
    file_path = "league-tables/" + str(season) + ".csv"

    if os.path.exists(file_path):
        team_stat_df.to_csv(file_path)
    else:
        team_stat_df.to_csv(file_path, mode="a")


def prepare_league_table(df, season):
    season_matches = df.groupby("season").get_group(season)
    get_team_wise_stat(season_matches, season)
    league_df = pd.DataFrame(columns=["team", "score", "gf", "ga", "last match"])
