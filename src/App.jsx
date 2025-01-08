import { useEffect, useState } from "react"
import { createNewJoke, getAllJokes} from "./services/jokeService.js"
import "./App.css"
import stevePic from "./assets/steve copy.png"

export const App = () => {
  const [newJoke, setNewJoke] = useState([])
  const [allJokes, setAllJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])


  const transientState = {

    "id": 0,
    "text": newJoke,
    "told": false,

  }

  const jokeListData = () => {
      getAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray)
    })

  }

  useEffect(() => {
    jokeListData()
  }, [newJoke])

  useEffect(() => {
    if (allJokes.length > 0) {

      setToldJokes(allJokes.filter(joke => joke.told === true))
      setUntoldJokes(allJokes.filter(joke => joke.told === false))

    }
  }, [allJokes])

  return <div className="app-heading">
    <div className="app-heading-circle">
      <img className="app-logo" src={stevePic} alt="Good job Steve" />
    </div>
    <div className="app-heading-text">Chuckle Checklist!</div>
    <div>
      <div className="joke-add-form">
        <input className="joke-input" type="text" placeholder="New One Liner" value={newJoke} onChange={(event) => {
          setNewJoke(event.target.value)
        }} />
        <button className="joke-input-submit" onClick={(event) => { createNewJoke(transientState), setNewJoke("") }}>Add</button>
      </div>
      <div className="joke-lists-container">
        <header className="joke-lists-container">Told</header>
        <div >
          {toldJokes.map(joke => {
            return (
              <div className="joke-list-item" key={joke.id}>
                <div className="joke-list-item-text">{joke.text}</div>
              </div>
            )
          })}
        </div>
        <div>
          <header className="joke-lists-container">UnTold</header>
          <div >
            {untoldJokes.map(joke => {
              return (
                <div className="joke-list-item" key={joke.id}>
                  <div className="joke-list-item-text">{joke.text}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
}
