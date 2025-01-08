import { useEffect, useState } from "react"
import { createNewJoke, getAllJokes } from "./services/jokeService.js"
import "./App.css"
import stevePic from "./assets/steve copy.png"

export const App = () => {
  const [newJoke, setNewJoke] = useState([])
  const [allJokes, setAllJokes] = useState([])

  const transientState = {

    "id": 0,
    "text": newJoke,
    "told": false

}

  useEffect(() => {
    getAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray)
    })
  }, [])
 
  const handleBtnClick = () => {
    createNewJoke(transientState)
    setNewJoke("")
    console.log("clicked")
  }

  return <div className="app-heading">
    <div className="app-heading-circle">
   <img className="app-logo" src={stevePic} alt="Good job Steve" />
 </div>
    <div className="app-heading-text">Chuckle Checklist!</div>
    <div>
     <div className="joke-add-form">
      <input className="joke-input" type="text" placeholder="New One Liner" value={newJoke} onChange={(event) => {
        // What's the value of event?
        setNewJoke(event.target.value)
      }} />
      <button className="joke-input-submit" onClick={(event) => {handleBtnClick(event.target.value)}}>Add</button>
      </div>
    </div>
  </div>
}
