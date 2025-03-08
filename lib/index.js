class Complex extends Entity
{
    constructor(real = 0, imag = 0)
    {
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



class Vector3 extends Entity
{
    constructor(x = 0, y = 0, z = 0)
    {
        super()
        this.x = x
        this.y = y
        this.z = z
    }

    dot(b)
    {
        return this.x*b.x + this.y*b.y + this.z*b.z;
    }
    scale(b)
    {
        return new Vector3(this.x*b, this.y*b, this.z*b)
    }
    addVectors(b)
    {
        return new Vector3(this.x+b.x, this.y+b.y, this.z+b.z)
    }
    subVectors(b)
    {
        return new Vector3(this.x-b.x, this.y-b.y, this.z-b.z)
    }



    static objectFunctions = [
        ["Vector3","Vector3","mult", (a,b) => {return a.dot(b)}, true],
        ["Number","Vector3","mult", (a,b) => {return a.scale(b)}, true],
        ["Vector3","Vector3","add", (a,b) => {return a.addVectors(b)}, true],
        ["Vector3","Vector3","sub", (a,b) => {return a.subVectors(b)},true ]

    ]
}