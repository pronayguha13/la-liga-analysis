import csv
import json
from typing import Dict, List


def convert_csv_to_json(csv_file):
    table = []
    with open(csv_file, mode="r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            row_data = {k: v for k, v in row.items()}
            table.append(row_data)
    return table
