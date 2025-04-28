
class Entity
{
    //lists every operation
    static operations = new Map()
    //registers new operations
    static register(typeA,typeB,generalized,func)
    {
        /*typeA and typeB are the constructor types of the arguments
        *generalized is the generalized operation (i.e multiplication, addition)
        *func is the specialized operation that deals specifically with those argument types*/
        this.operations.set(`${typeA},${typeB},${generalized}`, func)
    }

    /**
     * Evaluates the operation between two mathematical objects
     * Supports add(), sub(), mult(), div
     * @param {*} e2 - any mathematical object for which the operation is defined
     * @returns 
     */
    add(e2) {return add(this,e2)}
    sub(e2) {return sub(this,e2)}
    mult(e2) {return mult(this,e2)}
    div(e2) {return div(this,e2)}
}


class Complex extends Entity
{
    constructor(real = 0, imag = 0)
    {
        super();
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
    div(b)
    {
        if (b.real === 0 && b.imag === 0) {
            throw new Error("Cannot divide by zero");
        }
        const denominator = b.real * b.real + b.imag * b.imag;
        return new Complex((this.real * b.real + this.imag * b.imag) / denominator, (this.imag * b.real - this.real * b.imag) / denominator);
    }
    conjugate()
    {
        return new Complex(this.real, -this.imag);
    }
    magnitude()
    {
        return Math.sqrt(this.real**2 + this.imag**2);
    }

    static objectFunctions = [
        ["Complex","Complex","mult", (a,b) => {return a.mult(b)}, true],
        ["Complex","Number","mult", (a,b) => {return a.scale(b)}, true],
        ["Complex","Complex","add", (a,b) => {return a.add(b)}, true],
        ["Complex","Complex","sub", (a,b) => {return a.sub(b)},true],
        ["Complex","Number","add", (a,b) => {return a.add(new Complex(b, 0))},true],
        ["Complex","Number","sub", (a,b) => {return a.sub(new Complex(b, 0))},true],
        ["Complex","Complex","div", (a,b) => {return a.div(b)}, true],
        ["Complex","Number","div", (a,b) => {return a.div(new Complex(b, 0))},true],
    ]
}

class Matrix extends Entity
{
    constructor(data) {
        super();
        if (data instanceof Array) {
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
            this.data = data;
        } else {
            throw new Error("Matrix must be initialized with an array");
        }
    }

    toString() {
        for (let i = 0; i < this.rows; i++) {
            console.log(this.data[i].join(" "));
        }
    }
    add(b)
    {
        if (this.data.length != b.data.length)
            throw(new error("Matrices must have the same amount of rows"));
        if (this.data[0].length != b.data[0].length)
            throw(new error("Matrices must have the same amount of columns"));
        let newMatrixData = [];

        for(let i = 0; i < this.data.length; i++)
        {
            let row = [];
            for(let j = 0; j < this.data[0].length; j++)
            {
                row.push(this.data[i][j] + b.data[i][j]);
            }
            newMatrixData.push(row);
        }

        return new Matrix(newMatrixData);
    }

    mult(b) {
        let newMatrixData = [];
        
        if (this.data[0].length != b.data.length)
            throw new Error("Invalid matrix dimensions. Matrices should be of the form AxB, BxC");

        //Take the dot products of row and columns accordingly
        for (let aRow = 0; aRow < this.data.length; aRow++) {
            let newRow = [];
            for (let bCol = 0; bCol < b.data[0].length; bCol++) {
                let sum = 0;
                for (let i = 0; i < this.data[0].length; i++) {
                    sum += this.data[aRow][i] * b.data[i][bCol];
                }
                newRow.push(sum);
            }
            newMatrixData.push(newRow);
        }
    
        return new Matrix(newMatrixData);
    }

    scale(b) {
        let newMatrixData = [];
        for (let i = 0; i < this.rows; i++) {
            let newRow = [];
            for (let j = 0; j < this.cols; j++) {
                newRow.push(this.data[i][j] * b);
            }
            newMatrixData.push(newRow);
        }
        return new Matrix(newMatrixData);
    }

    sub(b)
    {
        if (this.data.length != b.data.length)
            throw(new error("Matrices must have the same amount of rows"));
        if (this.data[0].length != b.data[0].length)
            throw(new error("Matrices must have the same amount of columns"));
        let newMatrixData = [];
        for(let i = 0; i < this.data.length; i++)   
        {
            let row = [];
            for(let j = 0; j < this.data[0].length; j++)
            {
                row.push(this.data[i][j] - b.data[i][j]);
            }
            newMatrixData.push(row);
        }
        return new Matrix(newMatrixData);
    }

    transpose() {
        let newMatrixData = [];

        for (let i = 0; i < this.cols; i++) {
            let newRow = [];
            for (let j = 0; j < this.rows; j++) {
                newRow.push(this.data[j][i]);
            }
            newMatrixData.push(newRow);
        }
        return new Matrix(newMatrixData);
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
            super(data.map(x => [x]))
            this.size = size;

        } else {
            throw new Error("Vector must be initialized with an array");
        }
    }
    
    add(b) {
        if (!(b instanceof Vector) || this.size !== b.size) {
            throw new Error("Addition requires two vectors of the same size");
        }
        let result = []
        for (let i = 0; i < this.size; i++) {
            result.push(this.data[i][0] + b.data[i][0]);
        }
        let newVector = new Vector(result);

        return newVector;
    }
    sub(b) {
        if (!(b instanceof Vector) || this.size !== b.size) {
            throw new Error("Addition requires two vectors of the same size");
        }
        let result = []
        for (let i = 0; i < this.size; i++) {
            result.push(this.data[i][0] - b.data[i][0]);
        }
        let newVector = new Vector(result);

        return newVector;
    }

    scale(b) {
        let result = []
        
        for (let i = 0; i < this.size; i++) {
            result.push(this.data[i][0] * b);
        }
        
        return new Vector(result);
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
        return new Vector([
        this.data[1][0] * b.data[2][0] - this.data[2][0] * b.data[1][0],
        this.data[2][0] * b.data[0][0] - this.data[0][0] * b.data[2][0],
        this.data[0][0] * b.data[1][0] - this.data[1][0] * b.data[0][0]
        ]);
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

//registers all operations
for(let i of Vector.objectFunctions)
    {
        if(i[4] && i[0] != i[1])
            Entity.register(i[1], i[0], i[2], i[3])
    
        Entity.register(i[0], i[1], i[2], i[3])
    }
    
for(let i of Matrix.objectFunctions)
    {
        if(i[4] && i[0] != i[1])
            Entity.register(i[1], i[0], i[2], i[3])
    
        Entity.register(i[0], i[1], i[2], i[3])
    }
for(let i of Complex.objectFunctions)
    {
        if(i[4] && i[0] != i[1])
            Entity.register(i[1], i[0], i[2], i[3])
    
        Entity.register(i[0], i[1], i[2], i[3])
    }





//searches entity.operations
function evaluate(a,b,generalized)
{
    let typeA = a.constructor.name;
    let typeB = b.constructor.name;

    var key = `${typeA},${typeB},${generalized}`
    let op = Entity.operations.get(key)

    if(!op)
        throw(new Error(`${generalized} is not supported between ` + typeA + " and " + typeB))

    if(typeA === "Number")
        return(Entity.operations.get(key)(b,a))

    return(Entity.operations.get(key)(a,b))
}

function add(a,b) {return evaluate(a,b,"add")}
function sub(a,b) {return evaluate(a,b,"sub")}
function mult(a,b) {return evaluate(a,b,"mult")}
function div(a,b) {return evaluate(a,b,"div")}

module.exports = { Entity, Complex, Matrix, Vector, add, sub, mult, div }