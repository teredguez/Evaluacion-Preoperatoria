# -*- coding: utf-8 -*-

import pandas as pd
import joblib

from sklearn.model_selection import (
    train_test_split,
    cross_val_score
)

from sklearn.linear_model import LogisticRegression

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    roc_auc_score
)

# Carga de Datasets de NHANES

df_demo = pd.read_sas("DEMO_J.xpt", format="xport")
df_cbc = pd.read_sas("CBC_J.xpt", format="xport")
df_bmx = pd.read_sas("BMX_J.xpt", format="xport")
df_mcq = pd.read_sas("MCQ_J.xpt", format="xport")
df_diq = pd.read_sas("DIQ_J.xpt", format="xport")
df_bpx = pd.read_sas("BPX_J.xpt", format="xport")


df = pd.merge(df_demo, df_cbc, on="SEQN", how="inner")
df = pd.merge(df, df_bmx, on="SEQN", how="inner")
df = pd.merge(df, df_mcq, on="SEQN", how="inner")
df = pd.merge(df, df_diq, on="SEQN", how="inner")
df = pd.merge(df, df_bpx, on="SEQN", how="inner")

# Elección de variables

columnas = {
    "RIDAGEYR": "Edad",
    "RIAGENDR": "Sexo",
    "BMXBMI": "IMC",
    "LBXHGB": "Hemoglobina",

    "DIQ010": "Diabetes",

    "BPXSY1": "TAS",
    "BPXDI1": "TAD",

    "MCQ160B": "Cardiopatia",
    "MCQ160C": "Insuf_Cardiaca",
    "MCQ160D": "Angina",
    "MCQ160E": "Infarto"
}

df = df[list(columnas.keys())].rename(columns=columnas)

# Limpieza

df = df[df["Edad"] >= 20].copy()

df = df.dropna()

# Codificación

df["Sexo"] = df["Sexo"].map({
    1.0: 1,
    2.0: 0
})

df = df[df["Diabetes"].isin([1.0, 2.0])]

df["Diabetes"] = df["Diabetes"].map({
    1.0: 1,
    2.0: 0
})

for variable in [
    "Cardiopatia",
    "Insuf_Cardiaca",
    "Angina",
    "Infarto"
]:

    df = df[df[variable].isin([1.0, 2.0])]

    df[variable] = df[variable].map({
        1.0: 1,
        2.0: 0
    })

# Target

df["Riesgo_Cardiovascular"] = (
    (df["Cardiopatia"] == 1) |
    (df["Insuf_Cardiaca"] == 1) |
    (df["Angina"] == 1) |
    (df["Infarto"] == 1)
).astype(int)


# Variables predictoras

X = df[
    [
        "Edad",
        "Sexo",
        "IMC",
        "Hemoglobina",
        "Diabetes"
    ]
]

y = df["Riesgo_Cardiovascular"]

# Train/Test

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# Modelo

modelo = LogisticRegression(
    penalty=None,
    max_iter=5000,
    class_weight="balanced"
)

modelo.fit(X_train, y_train)

# Validación Cruzada

cv_scores = cross_val_score(
    LogisticRegression(
        penalty=None,
        max_iter=5000,
        class_weight="balanced"
    ),
    X,
    y,
    cv=5,
    scoring="roc_auc"
)

print("\nVALIDACIÓN CRUZADA:")

print("\nAUC-ROC por pliegue: ")
print(cv_scores)

print("\nAUC-ROC medio:")
print(cv_scores.mean())

print("\nDesviación estándar:")
print(cv_scores.std())

# Predicciones

y_pred = modelo.predict(X_test)

probs = modelo.predict_proba(X_test)[:, 1]

# Métricas
print("\nAccuracy:")
print(accuracy_score(y_test, y_pred))

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\nMatriz de Confusión:")
print(confusion_matrix(y_test, y_pred))

print("\nAUC-ROC final (conjunto de test):")
print(roc_auc_score(y_test, probs))

# Coeficientes

print("\nCOEFICIENTES:")

theta_0 = modelo.intercept_[0]

print(f"\nTheta_0 = {theta_0:.6f}")

for variable, coef in zip(X.columns, modelo.coef_[0]):
    print(f"{variable}: {coef:.6f}")

