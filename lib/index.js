
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



class Vector3 extends Entity
{
    constructor(x = 0, y = 0, z = 0)
    {

        super(Entity)
        for(let i = 0; i < 3; i++)

        
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

class Vector2 extends Vector3
{
    constructor(x = 0, y = 0) {
        super()
        this.x = x
        this.y = y
        this.z = 0;
    }
}
for(let i of Vector3.objectFunctions)
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
//Binary operations (for supporting scalar-object calculations)


/**
 * Performs a mathematical operation between any two numbers/structures
 * Supports add(), sub(), mult(), div()
 * @param {*} a - object 1
 * @param {*} b - object 2
 * @returns {*}
 */

function add(a,b) {return evaluate(a,b,"add")}
function sub(a,b) {return evaluate(a,b,"sub")}
function mult(a,b) {return evaluate(a,b,"mult")}
function div(a,b) {return evaluate(a,b,"div")}



module.exports = {
    Vector3,
    Entity,
    Vector2,
    add,
    sub,
    mult,
    div

}

