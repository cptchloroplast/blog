export function json(obj: object){
    return new Response(JSON.stringify(obj), { 
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export function xml(body: string) {
    return new Response(body, {
        headers: {
            "Content-Type": "application/xml",
        }
    })
}