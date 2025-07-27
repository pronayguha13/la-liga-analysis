import pandas as pd

from league_table.scripts.league_table import prepare_league_table


df = pd.read_csv("./data/matches_full.csv", parse_dates=["date"], index_col=[0])

# clear unnecessary columns
df.drop(columns=["comp", "match report", "notes"], inplace=True)

# optimize
df["gf"] = df["gf"].astype("int16")
df["ga"] = df["ga"].astype("int16")
df["attendance"] = df["attendance"].fillna(0)
df["attendance"] = df["attendance"].astype(int)
df["sh"] = df["sh"].astype("int8")
df["fk"] = df["fk"].astype("int8")
df["pk"] = df["pk"].astype("int8")
df["pkatt"] = df["pkatt"].astype("int8")
df["season"] = df["season"].astype(int)
df["poss"] = df["poss"].astype("float16")


# fill empty referee with unknown
df["referee"] = df["referee"].fillna("unknown")


# create an abbrevation column from the team column
def create_abbr_team(team_name):
    return team_name.upper()


df["team"] = df["team"].apply(create_abbr_team)

seasons = df["season"].unique()

for season in seasons:
    prepare_league_table(df=df, season=season)
