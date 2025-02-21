# 📊 Polynomial Solver

This project calculates the constant term (`c`) of an unknown polynomial using **Lagrange Interpolation** and **Matrix Method**. It takes multiple datasets in JSON format, converts values from different bases to decimal, and applies mathematical methods to find the solution.

## 🚀 Features
- Supports **Lagrange Interpolation** and **Matrix Method**
- Converts numbers from **different bases** (Binary, Octal, Hexadecimal, etc.) to **Base 10**
- Handles multiple datasets efficiently
- Outputs the exact constant term `c` for each dataset

---

## 📂 Project Structure

```bash
📁 Polynomial-Solver
│── 📜 find_c.js   # Solves for dataset 1 using Lagrange Interpolation
│── 📜 find_c2.js  # Solves for dataset 2 using Lagrange Interpolation
│── 📜 test2.js    # Combines both datasets for processing
│── 📜 data.json   # Input dataset 1
│── 📜 data2.json  # Input dataset 2
│── 📜 README.md   # Project Documentation
```

---

## 🛠️ Installation & Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/Polynomial-Solver.git
   cd Polynomial-Solver
   ```

2. **Install Node.js (if not installed)**
   - [Download Node.js](https://nodejs.org/)
   - Verify installation:
     ```sh
     node -v
     ```

3. **Run the Program**
   - **For dataset 1**:
     ```sh
     node find_c.js
     ```
   - **For dataset 2**:
     ```sh
     node find_c2.js
     ```
   - **For both datasets combined**:
     ```sh
     node test2.js
     ```

---

## 📊 Methods Used

### **1️⃣ Lagrange Interpolation**
Lagrange Interpolation is used to reconstruct the polynomial using given points \((x, y)\). It is computed as:

\[
P(x) = \sum_{i=0}^{n} y_i \prod_{j=0, j \neq i}^{n} \frac{x - x_j}{x_i - x_j}
\]

Where:
- \(x_i, y_i\) are given points.
- \(P(0)\) gives the constant term `c`.

---

### **2️⃣ Matrix Method**
We solve a system of linear equations representing the polynomial:

\[
Ax = B
\]

Where:
- \( A \) is a matrix containing powers of \( x \).
- \( B \) is a column matrix with \( y \) values.
- We solve for \( x \) to get the polynomial coefficients.

---

## 🎯 Example Dataset

**data.json:**
```json
{
  "keys": { "n": 4, "k": 3 },
  "1": { "base": "10", "value": "4" },
  "2": { "base": "2", "value": "111" },
  "3": { "base": "10", "value": "12" },
  "6": { "base": "4", "value": "213" }
}
```

**Expected Output:**
```
Constant term (c): 3
```

---

## 🤝 Contributing
If you'd like to improve this project, feel free to fork it and submit a pull request! 🚀

---
