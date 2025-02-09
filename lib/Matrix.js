class Matrix extends Entity
{
    constructor(array)
    {
        for(let i = 0; i < array.length; i++)
        {
            if(!Array.isArray(array[1]))
                throw(new Error("Matrix must be 2D"))
            for(let j = 0; j < i.length; j++)
            {
                if(Array.isArray(array[i][j]))
                    throw(new Error("Matrix cannot have more than two dimensions"))
            }
        }

        this.matrix = array;
    }


    
}