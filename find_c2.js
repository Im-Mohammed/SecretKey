const fs = require('fs');

/**
 * Convert a number from a given base to base 10.
 */
function convertToDecimal(value, base) {
    return parseInt(value, base);
}

/**
 * Multiply two matrices.
 */
function multiplyMatrices(A, B) {
    let result = new Array(A.length).fill(0).map(() => new Array(B[0].length).fill(0));

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < A[0].length; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return result;
}

/**
 * Find the inverse of a matrix using Gaussian elimination.
 */
function invertMatrix(matrix) {
    let n = matrix.length;
    let identity = new Array(n).fill(0).map((_, i) =>
        new Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))
    );

    for (let i = 0; i < n; i++) {
        let diagElement = matrix[i][i];
        for (let j = 0; j < n; j++) {
            matrix[i][j] /= diagElement;
            identity[i][j] /= diagElement;
        }

        for (let k = 0; k < n; k++) {
            if (k !== i) {
                let factor = matrix[k][i];
                for (let j = 0; j < n; j++) {
                    matrix[k][j] -= factor * matrix[i][j];
                    identity[k][j] -= factor * identity[i][j];
                }
            }
        }
    }

    return identity;
}

/**
 * Process dataset and find the constant term (c).
 */
function processDataset(fileName) {
    fs.readFile(fileName, 'utf8', (err, jsonData) => {
        if (err) {
            console.error(`Error reading ${fileName}:`, err);
            return;
        }

        const data = JSON.parse(jsonData);
        const n = data.keys.n;  // Number of points
        const k = data.keys.k;  // Required points (degree + 1)

        // Extract (x, y) pairs
        let points = [];
        for (const key in data) {
            if (key !== "keys") {
                let x = parseInt(key);
                let base = parseInt(data[key]["base"]);
                let y = convertToDecimal(data[key]["value"], base);
                points.push({ x, y });
            }
        }

        // Sort points by x values
        points.sort((a, b) => a.x - b.x);

        // Select the first k points
        let selectedPoints = points.slice(0, k);

        // Construct the Vandermonde matrix and Y matrix
        let degree = k - 1;
        let matrix = [];
        let yMatrix = [];

        for (let i = 0; i < k; i++) {
            let row = [];
            for (let j = degree; j >= 0; j--) {
                row.push(Math.pow(selectedPoints[i].x, j));
            }
            matrix.push(row);
            yMatrix.push([selectedPoints[i].y]);
        }

        // Invert the matrix
        let inverseMatrix = invertMatrix(matrix);

        // Multiply inverse with Y matrix to get coefficients
        let coefficients = multiplyMatrices(inverseMatrix, yMatrix);

        // The last coefficient is the constant term (c)
        console.log(`Calculated Constant Term (c) for ${fileName}:`, coefficients[coefficients.length - 1][0]);
    });
}

// Process only dataset2 (data2.json)
processDataset('data2.json');
