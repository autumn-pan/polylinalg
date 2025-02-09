

class Entity
{
    constructor(value)
    {
        this.value = value;
    }
    add(e2)
    {
        throw(new Error("Addition is not supported between" + typeof this + " and " + typeof e2))
    }
    sub(e2)
    {
        throw(new Error("Subtraction is not supported between" + typeof this + " and " + typeof e2))
    }
    mult(e2)
    {
        let u = multiplication.Vector3.Vector3;
        return(this.u(e2))

        let t1 = this.constructor.name;
        console.log(e2.constructor.name)
        let a = multiplication.t1
        let t2 = e2.constructor.name

        let b = a.t2
        return(this.b(e2))
        
                
        throw(new Error("Multiplication is not supported between " + this.constructor.name + " and " + e2.constructor.name))
    }
    div(e2)
    {
        throw(new Error("Division is not supported between" + typeof this + " and " + typeof e2))
    }
}




class Vector3 extends Entity
{
    constructor(...elements)
    {
        if(elements.length != 3)
            throw(new Error("Vector3 must be 3D"))

        super(Entity)
        for(let i = 0; i < 3; i++)

        
        this.x = elements[0]
        this.y = elements[1]
        this.z = elements[2]
    }
    dot(v2)
    {
        return this.x*v2.x + this.y*v2.y + this.z*v2.z;
    }
}



module.exports = {
    Vector3,
    Entity
}

