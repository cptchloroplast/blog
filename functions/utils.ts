export const json = (obj: Object) => new Response(JSON.stringify(obj), { 
  headers: {
    "Content-Type": "application/json",
  }
})