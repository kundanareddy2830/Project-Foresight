import requests
import sys

try:
    print("Fetching Transactions from Backend...")
    response = requests.get("http://localhost:8000/api/transactions", timeout=5)
    if response.status_code == 200:
        data = response.json()
        print(f"Received {len(data)} transactions.")
        if len(data) > 0:
            print("Sample Transaction:")
            print(data[0])
            
            # Check if it matches known Mock Data ID pattern
            first_id = data[0].get('id', '')
            if first_id in ['TX-0992', 'TX-1001']:
                print("WARNING: Backend returned Mock Data IDs!")
            else:
                print("SUCCESS: Backend returned dynamic/real data IDs.")
        else:
            print("WARNING: Backend returned empty list.")
    else:
        print(f"Failed to fetch. Status: {response.status_code}")
except Exception as e:
    print(f"Error: {e}")

print("\nFetching Analysis for random ID 'TX-TEST'...")
try:
    response = requests.get("http://localhost:8000/api/analyze/TX-TEST", timeout=10)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        res_json = response.json()
        print("Received Analysis Data.")
        print(f"VQE Energy: {res_json.get('vqeResults', {}).get('energy')}")
except Exception as e:
    print(f"Error: {e}")
