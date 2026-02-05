
try:
    import qiskit
    print(f"Qiskit Version: {qiskit.__version__}")
except ImportError:
    print("Qiskit not installed")

try:
    import qiskit_machine_learning
    print(f"Qiskit ML Version: {qiskit_machine_learning.__version__}")
except ImportError:
    print("Qiskit ML not installed")

print("\n--- Testing Imports ---")
try:
    from qiskit.circuit.library import RealAmplitudes
    print("✅ RealAmplitudes imported successfully")
except ImportError as e:
    print(f"❌ RealAmplitudes Import Failed: {e}")

try:
    from qiskit.circuit.library import ZZFeatureMap
    print("✅ ZZFeatureMap imported successfully")
except ImportError as e:
    print(f"❌ ZZFeatureMap Import Failed: {e}")

try:
    from qiskit.circuit.library import StartCircuit
    print("✅ StartCircuit imported successfully (Random check)")
except Exception as e:
    print(f"ℹ️ StartCircuit check: {e}")
