
class Entity
{
    static operations = new Map()

    static register(typeA,typeB,generalized,func)
    {
        this.operations.set(`${typeA},${typeB},${generalized}`, func)
    }



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
        let typeA = this.constructor.name;
        let typeB = e2.constructor.name;

        let key = `${typeA},${typeB},mult`
        let op = this.constructor.operations.get(key)
        if(!op)
            throw(new Error("Multiplication is not supported between " + this.constructor.name + " and " + e2.constructor.name))
        return(this.constructor.operations.get(key)(this,e2))
                
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

    static objectFunctions = [
        ["Vector3","Vector3","mult", (a,b) => {return a.dot(b)}]
    ]
}
for(let i of Vector3.objectFunctions)
{
    Entity.register(...i)
}


module.exports = {
    Vector3,
    Entity
}

