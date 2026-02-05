
try:
    from qiskit.circuit.library.ansatzes import RealAmplitudes
    print("✅ Direct Import RealAmplitudes Success")
except ImportError as e:
    print(f"❌ Direct Import RealAmplitudes Failed: {e}")

try:
    from qiskit.circuit.library.data_preparation import ZZFeatureMap
    print("✅ Direct Import ZZFeatureMap Success")
except ImportError as e:
    print(f"❌ Direct Import ZZFeatureMap Failed: {e}")
