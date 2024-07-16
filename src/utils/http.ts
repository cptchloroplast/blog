export function json(obj: object){
    return new Response(JSON.stringify(obj), { 
        headers: {
            "Content-Type": "application/json",
        }
    })
}