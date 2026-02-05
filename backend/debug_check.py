import os

cwd = os.getcwd()
print(f"Current Working Directory: {cwd}")

artifacts_path = os.path.join(cwd, "artifacts2")
print(f"Artifacts Path Expected: {artifacts_path}")
print(f"Artifacts Dir Exists: {os.path.isdir(artifacts_path)}")

csv_path = os.path.join(artifacts_path, "fraud_transactions_with_types3.csv")
print(f"CSV Path: {csv_path}")
print(f"CSV Exists: {os.path.exists(csv_path)}")

# Check what model_service would see
script_dir = os.path.dirname(os.path.abspath(__file__))
print(f"Script Dir (backend): {script_dir}")
