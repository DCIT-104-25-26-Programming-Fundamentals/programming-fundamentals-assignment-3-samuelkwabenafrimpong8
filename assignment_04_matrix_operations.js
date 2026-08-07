// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');


function readMatrix(rows, cols, name) {
    console.log(`\nEnter values for Matrix ${name}:`);
    let matrix = [];

    for (let i = 0; i < rows; i++) {
        let row = readlineSync
            .question(`Enter row ${i + 1}: `)
            .split(" ")
            .map(Number);

        while (row.length !== cols) {
            console.log(`Please enter exactly ${cols} numbers.`);
            row = readlineSync
                .question(`Enter row ${i + 1}: `)
                .split(" ")
                .map(Number);
        }

        matrix.push(row);
    }

    return matrix;
}


function displayMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join("\t"));
    }
}


function transposeMatrix(matrix) {
    let transpose = [];

    for (let j = 0; j < matrix[0].length; j++) {
        transpose[j] = [];

        for (let i = 0; i < matrix.length; i++) {
            transpose[j][i] = matrix[i][j];
        }
    }

    return transpose;
}


function addMatrices(matrixA, matrixB) {
    let result = [];

    for (let i = 0; i < matrixA.length; i++) {
        result[i] = [];

        for (let j = 0; j < matrixA[0].length; j++) {
            result[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }

    return result;
}


function multiplyMatrices(matrixA, matrixB) {
    let rowsA = matrixA.length;
    let colsA = matrixA[0].length;
    let colsB = matrixB[0].length;

    let result = [];

    for (let i = 0; i < rowsA; i++) {
        result[i] = [];

        for (let j = 0; j < colsB; j++) {
            result[i][j] = 0;

            for (let k = 0; k < colsA; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }

    return result;
}


function main() {


    console.log("=== PART A: Matrix Transpose ===");

    let rows = readlineSync.questionInt("Enter number of rows: ");
    let cols = readlineSync.questionInt("Enter number of columns: ");

    let matrix = readMatrix(rows, cols, "A");

    console.log("\nOriginal Matrix:");
    displayMatrix(matrix);

    console.log("\nTransposed Matrix:");
    displayMatrix(transposeMatrix(matrix));


    console.log("\n=== PART B: Matrix Addition ===");

    rows = readlineSync.questionInt("Enter number of rows: ");
    cols = readlineSync.questionInt("Enter number of columns: ");

    let matrix1 = readMatrix(rows, cols, "A");
    let matrix2 = readMatrix(rows, cols, "B");

    console.log("\nSum of the Matrices:");
    displayMatrix(addMatrices(matrix1, matrix2));


    console.log("\n=== PART C: Matrix Multiplication ===");

    let rowsA = readlineSync.questionInt("Enter rows for Matrix A: ");
    let colsA = readlineSync.questionInt("Enter columns for Matrix A: ");

    let matrixA = readMatrix(rowsA, colsA, "A");

    let rowsB = readlineSync.questionInt("Enter rows for Matrix B: ");
    let colsB = readlineSync.questionInt("Enter columns for Matrix B: ");

    if (colsA !== rowsB) {
        console.log("\nError: Matrix multiplication is not possible.");
        console.log("Columns of Matrix A must equal rows of Matrix B.");
        return;
    }

    let matrixB = readMatrix(rowsB, colsB, "B");

    console.log("\nProduct of the Matrices:");
    displayMatrix(multiplyMatrices(matrixA, matrixB));
}

main();