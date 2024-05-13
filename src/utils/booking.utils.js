export const stringToDate = (timestamp) => {

    const timestampParts = timestamp?.split(" ")
    const day = timestampParts[2]
    const month = timestampParts[1]
    const year = timestampParts[3]
    const time = timestampParts[4]

    const newDate = new Date(`${month} ${day}, ${year} ${time}`)
    return newDate

}