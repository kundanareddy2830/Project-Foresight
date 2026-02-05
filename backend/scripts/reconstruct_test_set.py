import numpy as np
import pandas as pd
import pickle
import os
from sklearn.model_selection import train_test_split

# Paths
ARTIFACTS_DIR = r"d:\dashboard\artifacts2"
OUTPUT_DIR = r"d:\dashboard\backend\app\data"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def reconstruct_data():
    print("--- Reconstructing Test Set from Artifacts ---")
    
    # 1. Load Artifacts
    print(f"Loading artifacts from {ARTIFACTS_DIR}...")
    try:
        X_augmented = np.load(os.path.join(ARTIFACTS_DIR, 'augmented_perturbation_vectors.npy'))
        y_augmented = np.load(os.path.join(ARTIFACTS_DIR, 'augmented_perturbation_labels.npy'))
        
        normal_df_pool = pd.read_csv(os.path.join(ARTIFACTS_DIR, 'normal_transactions_pool.csv'))
        fraud_df_pool = pd.read_csv(os.path.join(ARTIFACTS_DIR, 'fraud_transactions_pool.csv'))
        
        print("Artifacts loaded successfully.")
    except Exception as e:
        print(f"Error loading artifacts: {e}")
        return

    # 2. Replicate Notebook Logic
    TRAINING_SUBSAMPLE_SIZE = 1500
    SEED = 42

    # Create Details DataFrame
    subsample_df_details = pd.concat([
        normal_df_pool.sample(n=TRAINING_SUBSAMPLE_SIZE // 2, random_state=SEED),
        fraud_df_pool.sample(n=TRAINING_SUBSAMPLE_SIZE // 2, random_state=SEED)
    ]).reset_index(drop=True)

    # Match Vectors (This is the critical step from the notebook)
    df_temp = pd.DataFrame(X_augmented)
    df_temp['label'] = y_augmented
    
    # We must match the sampling logic exactly
    subsample_df_vectors = pd.concat([
        df_temp[df_temp['label'] == 0].sample(n=TRAINING_SUBSAMPLE_SIZE // 2, random_state=SEED),
        df_temp[df_temp['label'] == 1].sample(n=TRAINING_SUBSAMPLE_SIZE // 2, random_state=SEED)
    ])

    X_subsample_raw = subsample_df_vectors.drop('label', axis=1).values
    y_subsample = subsample_df_vectors['label'].values

    # 3. Perform the Split
    print("Performing train_test_split...")
    _, X_test_raw, _, y_test, _, test_df_details = train_test_split(
        X_subsample_raw, y_subsample, subsample_df_details,
        test_size=0.3, random_state=SEED, stratify=y_subsample
    )
    
    print(f"✅ Isolated {len(X_test_raw)} Test Vectors.")
    
    # 4. Save to Production Pickle
    output_data = {
        "vectors": X_test_raw,      # The 16D Embeddings (Real)
        "labels": y_test,           # 0 or 1
        "details": test_df_details  # DataFrame with transaction metadata
    }
    
    output_path = os.path.join(OUTPUT_DIR, "production_test_set.pkl")
    with open(output_path, 'wb') as f:
        pickle.dump(output_data, f)
        
    print(f"Saved production dataset to: {output_path}")

    # 5. Also copy the Projection Matrix for the Engine
    try:
        proj_matrix = np.load(os.path.join(ARTIFACTS_DIR, 'projection_matrix.npy'))
        np.save(os.path.join(OUTPUT_DIR, 'projection_matrix.npy'), proj_matrix)
        print("Copied projection_matrix.npy to backend data.")
    except Exception as e:
        print(f"Could not copy projection matrix: {e}")

if __name__ == "__main__":
    reconstruct_data()
