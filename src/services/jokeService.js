export const getAllJokes = async () => {
    return fetch("http://localhost:8088/jokes").then((res) => res.json())
}

export const createNewJoke = async (transientState) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transientState)
    }

    const response = await fetch("http://localhost:8088/jokes", postOptions)
}