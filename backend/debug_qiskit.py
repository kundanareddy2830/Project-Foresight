print("Testing Qiskit Imports...")
try:
    import qiskit
    print(f"Qiskit Version: {qiskit.__version__}")
except ImportError as e:
    print(f"Qiskit Core Import Failed: {e}")

try:
    from qiskit.circuit.library import RealAmplitudes
    print("✅ RealAmplitudes imported")
except ImportError as e:
    print(f"❌ RealAmplitudes Import Failed: {e}")

try:
    from qiskit.circuit.library import ZZFeatureMap
    print("✅ ZZFeatureMap imported")
except ImportError as e:
    print(f"❌ ZZFeatureMap Import Failed: {e}")

try:
    from qiskit_algorithms.optimizers import SPSA
    print("✅ SPSA imported")
except ImportError as e:
    print(f"❌ SPSA Import Failed: {e}")

try:
    from qiskit_machine_learning.kernels import FidelityQuantumKernel
    print("✅ FidelityQuantumKernel imported")
except ImportError as e:
    print(f"❌ FidelityQuantumKernel Import Failed: {e}")
