const fs = require('fs');

/**
 * Function to convert a number from a given base to base 10.
 */
function convertToDecimal(value, base) {
    return parseInt(value, base);
}

/**
 * Function to calculate Lagrange interpolation for any number of points.
 */
function lagrangeInterpolation(points, xValue) {
    let result = 0;
    let n = points.length;

    for (let i = 0; i < n; i++) {
        let term = points[i].y;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (xValue - points[j].x) / (points[i].x - points[j].x);
            }
        }
        result += term;
    }
    return result;
}

/**
 * Function to process a given JSON dataset and compute the constant term.
 */
function processDataset(fileName) {
    fs.readFile(fileName, 'utf8', (err, jsonData) => {
        if (err) {
            console.error(`Error reading ${fileName}:`, err);
            return;
        }

        const data = JSON.parse(jsonData);

        // Extract values
        let points = [];
        for (const key in data) {
            if (key !== "keys") {
                let x = parseInt(key); // Convert key to integer
                let base = parseInt(data[key]["base"]); // Extract base
                let y = convertToDecimal(data[key]["value"], base); // Convert to decimal

                points.push({ x, y });
            }
        }

        // Compute c using all points
        let cValue = lagrangeInterpolation(points, 0);

        console.log(`Constant Term (c) for ${fileName}:`, cValue);
    });
}

// Process all test cases
const testFiles = ['data.json', 'data2.json'];

testFiles.forEach(file => processDataset(file));
