const Complex = require('../lib/index.js').Complex;
const Matrix = require('../lib/index.js').Matrix;
const Vector = require('../lib/index.js').Vector;

test("Complex Addition", () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 4);
    const result = a.add(b);
    expect(result.real).toBe(4);
    expect(result.imag).toBe(6);
}
);
test("Complex Subtraction", () => {
    const a = new Complex(5, 6);
    const b = new Complex(3, 4);
    const result = a.sub(b);
    expect(result.real).toBe(2);
    expect(result.imag).toBe(2);
}
);
test("Complex Multiplication", () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 4);
    const result = a.mult(b);
    expect(result.real).toBe(-5);
    expect(result.imag).toBe(10);
}
);
test("Complex Division", () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 4);
    const result = a.div(b);
    expect(result.real).toBe(0.44);
    expect(result.imag).toBe(0.08);
}
);
test("Complex Conjugate", () => {
    const a = new Complex(1, 2);
    const result = a.conjugate();
    expect(result.real).toBe(1);
    expect(result.imag).toBe(-2);
}
);
test("Complex Magnitude", () => {
    const a = new Complex(3, 4);
    const result = a.magnitude();
    expect(result).toBe(5);
}
);

test("Matrix Multiplication", () => {
    const a = new Matrix([
        [1, 2],
        [3, 4]
    ]);
    const b = new Matrix([
        [5, 6],
        [7, 8]
    ]);
    
    const result = a.mult(b);
    expect(result).toEqual(new Matrix([
        [19, 22],
        [43, 50]
    ]));
});

test("Matrix Addition", () => {
    const a = new Matrix([
        [1, 2],
        [3, 4]
    ]);
    const b = new Matrix([
        [5, 6],
        [7, 8]
    ]);
    
    const result = a.add(b);
    expect(result).toEqual(new Matrix([
        [6, 8],
        [10, 12]
    ]));
}
);
test("Matrix Subtraction", () => {
    const a = new Matrix([
        [5, 6],
        [7, 8]
    ]);
    const b = new Matrix([
        [1, 2],
        [3, 4]
    ]);
    
    const result = a.sub(b);
    expect(result).toEqual(new Matrix([
        [4, 4],
        [4, 4]
    ]));
}
);
test("Matrix Transpose", () => {
    const a = new Matrix([
        [1, 2],
        [3, 4]
    ]);
    
    const result = a.transpose();
    expect(result).toEqual(new Matrix([
        [1, 3],
        [2, 4]
    ]));
}
);
test("Vector Addition", () => {
    const a = new Vector([1, 2, 3]);
    const b = new Vector([4, 5, 6]);
    
    const result = a.add(b);
    console.log(result);
    expect(result).toEqual(new Vector([5, 7, 9]));
}
);
test("Vector Subtraction", () => {
    const a = new Vector([4, 5, 6]);
    const b = new Vector([1, 2, 3]);
    
    const result = a.sub(b);
    expect(result).toEqual(new Vector([3, 3, 3]));
}
);
test("Vector Dot Product", () => {
    const a = new Vector([1, 2, 3]);
    const b = new Vector([4, 5, 6]);
    
    const result = a.dot(b);
    expect(result).toBe(32);
}
);
test("Vector Magnitude", () => {
    const a = new Vector([3, 4]);
    
    const result = a.magnitude();
    expect(result).toBe(5);
}
);

test("Vector Cross Product", () => {
    const a = new Vector([1, 2, 3]);
    const b = new Vector([4, 5, 6]);
    
    const result = a.cross(b);
    expect(result).toEqual(new Vector([-3, 6, -3]));
}
);

test("Vector Scalar Multiplication", () => {
    const a = new Vector([1, 2, 3]);
    const scalar = 2;
    
    const result = a.scale(scalar);
    expect(result).toEqual(new Vector([2, 4, 6]));
}
);

test("Matrix-Vector Multiplication", () => {
    const matrix = new Matrix([
        [1, 2],
        [3, 4]
    ]);
    const vector = new Vector([5, 6]);

    const result = matrix.mult(vector);
    console.log(result);
    expect(result).toEqual(new Matrix([[17], [39]]));
}
);
