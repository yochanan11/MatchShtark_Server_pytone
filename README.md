## 🎯 Project Background & Evolution

### 🔹 Initial Vision: Academic Guidance Assistant

The original idea behind this project was to build a **machine-learning-powered academic advisor**.
We aimed to help students choose their study path based on personalized factors such as previous education, interests, capabilities, and real-world success data. The idea was to automate and optimize the role of a human advisor through data analysis and pattern recognition.

### 🔄 Pivot: Matchmaking System for the Haredi Community

After consulting with our academic supervisor, the project evolved into a **more socially impactful and technically challenging task**:

> Building a smart matchmaking system tailored for the **Haredi (ultra-Orthodox Jewish) community**.

This pivot preserved the same core logic — matching between two entities (student-course or boy-girl) based on past success patterns — but it required much **deeper adaptation** in terms of culture, data structure, and interface.

It was important to respect privacy, cultural norms, and work with often limited or inconsistent data. The system is now designed to **learn from successful matches**, analyze patterns, and propose high-quality candidate matches to matchmakers.

💡 **Note:** Although the project became a matchmaking system, it remains **fully adaptable** to the original educational advisor idea — or even other use cases like recruitment or role assignments — by simply changing the input data and matching criteria.

---

## ⚙️ Technology Stack & Key Design Decisions

### 🛠️ Initial Plan: Node.js + Python

At first, we planned to use:

* **Node.js** for the backend API
* **Python** for the machine learning model
  This architecture is common, but it required **running two servers simultaneously**, managing cross-language communication, and synchronizing model output with HTTP requests — which led to complexity and maintenance overhead.

### 🔁 Rethinking the Architecture

We quickly realized that the operational cost and technical overhead were unjustified for our needs.
As a result, we made a key strategic decision:

> ✅ **Unify the entire backend using Flask (Python)**, so that both the API and the machine learning model live in the same environment.

### ✅ Benefits of the Flask-based Approach

* **Fast Response Time** — under 2 seconds even under moderate load
* **Simpler Deployment** — no need for two separate servers
* **Single Language Backend** — easier to maintain and expand
* **Direct Integration** — the ML model runs natively inside the same codebase as the REST API
* **Easy Customization** — swapping datasets allows the system to be reused in other domains

---

## 🧠 Machine Learning Details

* **Model Used:** `XGBoost` classifier, trained on real historical match data
* **Feature Engineering:**  Structured comparison of family, lifestyle, education, and social preferences
* **Evaluation:** GridSearchCV for parameter tuning, `SHAP` for feature importance visualization
* **Balance Handling:** SMOTE applied to balance the dataset
* **Top-N Predictions:** System ranks top 5 best match candidates using probability scoring

---

## 🌐 Tech Stack Overview

| Layer            | Technology            | Description                                                          |
| ---------------- | --------------------- | -------------------------------------------------------------------- |
| Frontend         | React.js              | Responsive UI, data fetching, profile forms, and dashboard features  |
| Backend API      | Flask (Python)        | RESTful API, user management, match prediction, MongoDB access       |
| Database         | MongoDB Atlas         | Cloud-based NoSQL database with candidate profiles and match history |
| ML Libraries     | XGBoost, SHAP, SMOTE  | ML training, model interpretation, data balancing                    |
| Deployment Ready | Portable Flask Server | Easily deployable via cloud or local server                          |

---

## 🧩 Flexible & Reusable Architecture

The MatchShtark platform is **not limited to matchmaking**. It can easily be adapted to:

* Academic program recommendations
* Career or job matching
* Volunteer-role fit
* Medical compatibility suggestion systems

By changing the data and fine-tuning the model, you can **reuse the same architecture** across multiple domains.

---

## 🙏 Special Thanks

Project by **Yochanan Shwadron** and **Daniel Aroll**
Under the guidance of **Uri Isralis**
Final year project – B.Sc. Computer Science
