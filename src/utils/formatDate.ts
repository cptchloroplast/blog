const formatDate = (date: string | Date) => new Date(date).toISOString().split("T")[0]

export default formatDate
