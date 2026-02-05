import requests
import sys

try:
    print("Checking backend health...")
    response = requests.get("http://localhost:8000/api/health", timeout=2)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
