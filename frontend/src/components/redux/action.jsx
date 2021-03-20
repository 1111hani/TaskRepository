
export const action = new Proxy(
    
    {},
    {
        get: function (target, prop) {
            if(target[prop]===undefined)
            return function(args){
                return{
                    type:prop,
                    payload:args
                }
            }
            else return target[prop]
        }
    }
)

