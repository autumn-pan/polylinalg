
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

    //instance operations
    add(e2) {return add(this,e2)}
    sub(e2) {return sub(this,e2)}
    mult(e2) {return mult(this,e2)}
    div(e2) {return div(this,e2)}
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


//searches entity.operations
function evaluate(a,b,generalized)
{
    let typeA = a.constructor.name;
    let typeB = b.constructor.name;

    let key = `${typeA},${typeB},${generalized}`
    let op = Entity.operations.get(key)
    if(!op)
        throw(new Error(`${generalized} is not supported between ` + a.constructor.name + " and " + b.constructor.name))
    return(Entity.operations.get(key)(a,b))
}
//Binary operations (for supporting scalar-object calculations)
function add(a,b) {return evaluate(a,b,"add")}
function sub(a,b) {return evaluate(a,b,"sub")}
function mult(a,b) {return evaluate(a,b,"mult")}
function div(a,b) {return evaluate(a,b,"div")}

module.exports = {
    Vector3,
    Entity
}

