

export default function createReducer(state,action,handlers)
{
    const handler=handlers[action.type]
    if(handler)
        handler(state,action)
}