
import inspect
try:
    from qiskit.circuit.library import ZZFeatureMap
    print(f"✅ ZZFeatureMap module: {inspect.getmodule(ZZFeatureMap)}")
except ImportError as e:
    print(f"❌ Standard Import Failed: {e}")
    # Try data_preparation
    try:
        from qiskit.circuit.library.data_preparation import ZZFeatureMap
        print(f"✅ Found in data_preparation: {inspect.getmodule(ZZFeatureMap)}")
    except ImportError:
        print("❌ Not in data_preparation")

    # Try data_preparation.zz_feature_map
    try:
        from qiskit.circuit.library.data_preparation.zz_feature_map import ZZFeatureMap
        print(f"✅ Found in data_preparation.zz_feature_map: {inspect.getmodule(ZZFeatureMap)}")
    except ImportError:
        print("❌ Not in data_preparation.zz_feature_map")
