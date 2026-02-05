import sys
import os
import traceback

# Add current directory to path so we can import services
sys.path.append(os.getcwd())

print("Attempting to initialize ModelService...")
try:
    from services.model_service import ModelService
    service = ModelService()
    print("✅ ModelService Initialized.")
except Exception as e:
    print(f"❌ ModelService Init Failed: {e}")
    traceback.print_exc()
    sys.exit(1)

print("\nAttempting analyze_transaction('TX-TEST')...")
try:
    result = service.analyze_transaction("TX-TEST")
    print("✅ Analysis Successful!")
    print(f"Verdict: {result.vqeResults.verdict}")
    print(f"Probs: {result.vqeResults.probabilities}")
    print(f"Qiskit Loaded: {service.RealAmplitudes is not None}")
except Exception as e:
    print(f"❌ Analysis Failed: {e}")
    traceback.print_exc()
