
import inspect
try:
    from qiskit.circuit.library import RealAmplitudes
    print(f"✅ RealAmplitudes module: {inspect.getmodule(RealAmplitudes)}")
except ImportError as e:
    print(f"❌ Standard Import Failed: {e}")
    # Try n_local
    try:
        from qiskit.circuit.library.n_local import RealAmplitudes
        print("✅ Found in n_local")
    except ImportError:
        print("❌ Not in n_local")

