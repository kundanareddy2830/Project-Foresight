import joblib
import torch
import os
import sys

ARTIFACTS_DIR = "../artifacts2"

def test_load_artifacts():
    print(f"Testing artifact loading from {ARTIFACTS_DIR}...")
    
    # Check 1: Load generic pickle (XGBoost)
    try:
        xgb = joblib.load(os.path.join(ARTIFACTS_DIR, "xgb_final_model.pkl"))
        print(f"✅ XGBoost Model loaded: {type(xgb)}")
    except Exception as e:
        print(f"❌ XGBoost Load Failed: {e}")

    # Check 2: Load PyTorch Embeddings
    try:
        embeddings = torch.load(os.path.join(ARTIFACTS_DIR, "2normal_graph_embeddings.pt"))
        print(f"✅ GNN Embeddings loaded: {type(embeddings)} with shape {embeddings.shape}")
    except Exception as e:
        print(f"❌ GNN Embeddings Load Failed: {e}")

    # Check 3: Load Dictionary (Account Map)
    try:
        with open(os.path.join(ARTIFACTS_DIR, "account_to_idx.pkl"), "rb") as f:
            import pickle
            acc_map = pickle.load(f)
        print(f"✅ Account Map loaded. Total accounts: {len(acc_map)}")
    except Exception as e:
        print(f"❌ Account Map Load Failed: {e}")

    # Check 4: Load QSVC (Might require Qiskit)
    try:
        qsvc = joblib.load(os.path.join(ARTIFACTS_DIR, "qsvc_2k.pkl"))
        print(f"✅ QSVC Model loaded: {type(qsvc)}")
    except Exception as e:
        print(f"❌ QSVC Load Failed (Expected if Qiskit version mismatch): {e}")

if __name__ == "__main__":
    test_load_artifacts()
