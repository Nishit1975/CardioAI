from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

# Load trained model and scaler
model  = pickle.load(open("model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

@app.route("/")
def home():
    return "Cardio ML Backend Running 🚀"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # ── Raw inputs from frontend ──────────────────────────────────────
        age_years = float(data["age"])     # user sends age in years
        gender    = float(data["gender"])  # frontend sends 1=female / 2=male
        height    = float(data["height"])  # cm
        weight    = float(data["weight"])  # kg
        ap_hi     = float(data["ap_hi"])
        ap_lo     = float(data["ap_lo"])

        # ── Fix: gender must match training encoding {1→0, 2→1} ──────────
        gender_encoded = 0.0 if gender == 1 else 1.0

        # ── Fix: BMI and BMI_category (must match training pipeline) ──────
        bmi = weight / ((height / 100) ** 2)
        if bmi < 18.5:
            bmi_category = 0.0
        elif bmi < 25:
            bmi_category = 1.0
        elif bmi < 30:
            bmi_category = 2.0
        else:
            bmi_category = 3.0

        # Default lifestyle feature values
        cholesterol = 1.0
        gluc        = 1.0
        smoke       = 0.0
        alco        = 0.0
        active      = 1.0

        # ── Fix: id was never dropped during training; use 0 as placeholder ─
        id_val = 0.0

        # ── Fix: Apply StandardScaler to numeric cols (same order as Cell 24) ─
        # num_cols = ['age', 'height', 'weight', 'ap_hi', 'ap_lo', 'BMI']
        numeric_raw = np.array([[age_years, height, weight, ap_hi, ap_lo, bmi]])
        numeric_scaled = scaler.transform(numeric_raw)[0]

        age_s    = numeric_scaled[0]
        height_s = numeric_scaled[1]
        weight_s = numeric_scaled[2]
        ap_hi_s  = numeric_scaled[3]
        ap_lo_s  = numeric_scaled[4]
        bmi_s    = numeric_scaled[5]

        # ── Fix: Feature order must match training columns exactly ─────────
        # Training columns (from X = df.drop('cardio', axis=1)):
        # id, age, gender, height, weight, ap_hi, ap_lo,
        # cholesterol, gluc, smoke, alco, active, BMI, BMI_category
        features = np.array([[
            id_val,
            age_s,
            gender_encoded,
            height_s,
            weight_s,
            ap_hi_s,
            ap_lo_s,
            cholesterol,
            gluc,
            smoke,
            alco,
            active,
            bmi_s,
            bmi_category
        ]])

        # ── Predict ───────────────────────────────────────────────────────
        prediction = model.predict(features)
        probability = model.predict_proba(features)

        # DEBUG (remove after confirming correct behaviour)
        print("[DEBUG] Raw input  :", data)
        print("[DEBUG] Scaled feat:", features)
        print("[DEBUG] Prediction :", prediction[0])
        print("[DEBUG] Probability:", probability)

        # Label mapping: 0 = No disease (Low Risk), 1 = Has disease (High Risk)
        result      = "High Risk" if prediction[0] == 1 else "Low Risk"
        confidence  = round(float(probability[0][prediction[0]]) * 100, 1)

        return jsonify({
            "success":    True,
            "prediction": result,
            "confidence": confidence
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error":   str(e)
        })

if __name__ == "__main__":
    app.run(debug=True, port=5000)