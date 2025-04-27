class Complex extends Entity
{
    constructor(real = 0, imag = 0)
    {
        // Error handling for complex number components
        if (typeof real !== 'number' || typeof imag !== 'number') {
            throw new Error("Complex number components must be numbers");
        }

        this.real = real;
        this.imag = imag;
    }
    toString() {
        if(imag >= 0)
            console.log(this.real + " + " + this.imag + "i")
        else
            console.log(this.real + " - " + this.imag + "i")
    }
    scale(b) 
    {
        return new Complex(this.real*b, this.imag*b)
    }
    add(b)
    {
        return new Complex(this.real + b.real, this.imag + b.imag)
    }
    sub(b)
    {
        return new Complex(this.real - b.real, this.imag - b.imag)
    }
    mult(b)
    {
        return new Complex(this.real * b.real - this.imag * b.imag, this.real * b.imag + this.imag * b.real)
    }
    static objectFunctions = [
        ["Complex","Complex","mult", (a,b) => {return a.mult(b)}, true],
        ["Complex","Number","mult", (a,b) => {return a.scale(b)}, true],
        ["Complex","Complex","add", (a,b) => {return a.add(b)}, true],
        ["Complex","Complex","sub", (a,b) => {return a.sub(b)},true],
        ["Complex","Number","add", (a,b) => {return a.add(new Complex(b, 0))},true],
        ["Complex","Number","sub", (a,b) => {return a.sub(new Complex(b, 0))},true]
    ]
}

class Matrix extends Entity
{
    constructor(data) {
        if (Array.isArray(data)) {
            const rows = data.length;
            const cols = data[0].length;

            // Validate matrix data
            for (let i = 0; i < rows; i++) {
                if (!Array.isArray(data[i]) || data[i].length !== cols) {
                    throw new Error("Invalid matrix data: all rows must have the same number of columns");
                }
                for (let j = 0; j < cols; j++) {
                    if (typeof data[i][j] !== 'number') {
                        throw new Error("Matrix elements must be numbers");
                    }
                }
            }

            this.rows = rows;
            this.cols = cols;
            this.data = data.map(row => row.slice());
        } else {
            throw new Error("Matrix must be initialized with an array");
        }
    }

    toString() {
        for (let i = 0; i < this.rows; i++) {
            console.log(this.data[i].join(" "));
        }
    }
    
    scale(b)
    {
        let result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.data[i][j] = this.data[i][j] * b;
            }
        }
        return result;
    }
    add(b)
    {
        let result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.data[i][j] = this.data[i][j] + b.data[i][j];
            }
        }
        return result;
    }
    sub(b)
    {
        let result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.data[i][j] = this.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }
    mult(b)
    {
        let result = new Matrix(this.rows, b.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < b.cols; j++) {
                for (let k = 0; k < this.cols; k++) {
                    result.data[i][j] += this.data[i][k] * b.data[k][j];
                }
            }
        }
        return result;
    }
    transpose()
    {
        let result = new Matrix(this.cols, this.rows);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.data[j][i] = this.data[i][j];
            }
        }
        return result;
    }
    static objectFunctions = [
        ["Matrix","Matrix","mult", (a,b) => {return a.mult(b)}, true],
        ["Matrix","Number","mult", (a,b) => {return a.scale(b)}, true],
        ["Matrix","Matrix","add", (a,b) => {return a.add(b)}, true],
        ["Matrix","Matrix","sub", (a,b) => {return a.sub(b)},true],
        ["Matrix","Number","add", (a,b) => {return a.add(new Matrix(a.rows, a.cols).scale(b))},true],
        ["Matrix","Number","sub", (a,b) => {return a.sub(new Matrix(a.rows, a.cols).scale(b))},true]
    ]
}


class Vector extends Matrix {
    constructor(data) {
        if (Array.isArray(data)) {
            const size = data.length;

            // Validate vector data
            for (let i = 0; i < size; i++) {
                if (typeof data[i] !== 'number') {
                    throw new Error("Vector elements must be numbers");
                }
            }

            super(size, 1);
            this.size = size;
            for (let i = 0; i < size; i++) {
                this.data[i][0] = data[i];
            }
        } else {
            throw new Error("Vector must be initialized with an array");
        }
    }

    toString() {
        console.log(this.data.map(row => row[0]).join(" "));
    }

    dot(b) {
        if (!(b instanceof Vector) || this.size !== b.size) {
            throw new Error("Dot product requires two vectors of the same size");
        }
        let result = 0;
        for (let i = 0; i < this.size; i++) {
            result += this.data[i][0] * b.data[i][0];
        }
        return result;
    }

    cross(b) {
        if (!(b instanceof Vector) || this.size !== 3 || b.size !== 3) {
            throw new Error("Cross products are only supported in R3 for now");
        }
        let result = new Vector(3);
        result.data[0][0] = this.data[1][0] * b.data[2][0] - this.data[2][0] * b.data[1][0];
        result.data[1][0] = this.data[2][0] * b.data[0][0] - this.data[0][0] * b.data[2][0];
        result.data[2][0] = this.data[0][0] * b.data[1][0] - this.data[1][0] * b.data[0][0];
        return result;
    }

    magnitude() {
        let sum = 0;
        for (let i = 0; i < this.size; i++) {
            sum += this.data[i][0] ** 2;
        }
        return Math.sqrt(sum);
    }

    normalize() {
        let mag = this.magnitude();
        if (mag === 0) {
            throw new Error("Cannot normalize a zero vector");
        }
        return this.scale(1 / mag);
    }

    static objectFunctions = [
        ["Vector", "Vector", "dot", (a, b) => a.dot(b), true],
        ["Vector", "Vector", "cross", (a, b) => a.cross(b), true],
        ["Vector", "Number", "scale", (a, b) => a.scale(b), true],
        ["Vector", "Vector", "add", (a, b) => a.add(b), true],
        ["Vector", "Vector", "sub", (a, b) => a.sub(b), true]
    ];
}