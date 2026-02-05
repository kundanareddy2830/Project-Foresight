
print("Testing all imports separately...")

try:
    from qiskit.circuit.library.n_local.real_amplitudes import RealAmplitudes
    print("✅ RealAmplitudes (Direct) matches")
except ImportError as e:
    print(f"❌ RealAmplitudes (Direct) Failed: {e}")

try:
    from qiskit.circuit.library.data_preparation.zz_feature_map import ZZFeatureMap
    print("✅ ZZFeatureMap (Direct) matches")
except ImportError as e:
    print(f"❌ ZZFeatureMap (Direct) Failed: {e}")

try:
    from qiskit.quantum_info import SparsePauliOp
    print("✅ SparsePauliOp matches")
except ImportError as e:
    print(f"❌ SparsePauliOp Failed: {e}")

try:
    from qiskit.primitives import Estimator, Sampler
    print("✅ Primitives matches")
except ImportError as e:
    print(f"❌ Primitives Failed: {e}")

try:
    from qiskit_algorithms.optimizers import SPSA
    print("✅ SPSA (qiskit_algorithms) matches")
except ImportError as e:
    print(f"❌ SPSA (qiskit_algorithms) Failed: {e}")
    print("HINT: Is 'qiskit-algorithms' installed?")

