import pandas as pd
import os


def get_goals_per_season(season, df):
    file_path = "../../league-tables/" + str(season) + ".csv"
    if os.path.exists(file_path):
        season_league_table = pd.read_csv(file_path)
        highest_goal = season_league_table["gf"].max()
        lowest_goal = season_league_table["gf"].min()
        highest_mask = season_league_table["gf"] == highest_goal
        lowest_mask = season_league_table["gf"] == lowest_goal
        total_goal = season_league_table["gf"].sum()
        highest_goal_scorer_team = season_league_table[highest_mask]["team"].iloc[0]
        lowest_goal_scorer_team = season_league_table[lowest_mask]["team"].iloc[0]
        print(highest_goal_scorer_team)
        temp = pd.DataFrame(
            [
                [
                    season,
                    total_goal,
                    highest_goal_scorer_team,
                    highest_goal,
                    lowest_goal_scorer_team,
                    lowest_goal,
                ]
            ],
            columns=df.columns,
        )
        return temp

    else:
        print(file_path)
        raise FileNotFoundError("League table not found")


def get_season_analysis(df):
    goal_df = pd.DataFrame(
        columns=[
            "Season",
            "Total Goal",
            "Most goal scored by",
            "Highest Goal",
            "Least goal scored by",
            "Lowest Goal",
        ]
    )
    seasons = df["season"].unique()
    # get total goal scored for each recorded season
    output_path = "../../output/goals.csv"
    season_group = df.groupby("season")
    for season in seasons:
        temp_df = get_goals_per_season(season, goal_df)
        goal_df = pd.concat([goal_df, temp_df], ignore_index=True)
    goal_df.set_index("Season", inplace=True)
    if os.path.exists(output_path):
        goal_df.to_csv(output_path)
    else:
        goal_df.to_csv(output_path, "a")


# load the dataset
df = pd.read_csv("../../la-liga-analysis.csv", parse_dates=["date"], index_col=[0])
get_season_analysis(df)
