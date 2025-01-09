import { useEffect, useState } from "react"
import { createNewJoke, getAllJokes, editJoke, deleteJoke} from "./services/jokeService.js"
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

  const handleToldStatus = (jokeId) => {
    const updatedJokes = allJokes.map(joke => joke.id === jokeId ? {...joke, told: !joke.told} : joke)
    setAllJokes(updatedJokes)
    const updatedJoke = updatedJokes.find(joke => joke.id === jokeId)
    editJoke(updatedJoke)
  }

  const handleDeleteJoke = (jokeId) => {
    deleteJoke(jokeId).then(() => {setAllJokes(allJokes.filter(joke => joke.id !== jokeId ))
    })
  }

  return <div className="app-heading">
    <div className="app-heading-circle">
      <img className="app-logo" src={stevePic} alt="Good job Steve" />
    </div>
    <div className="app-heading-text">Chuckle Checklist</div>
    <div>
      <div className="joke-add-form">
        <input className="joke-input" type="text" placeholder="New One Liner" value={newJoke} onChange={(event) => {
          setNewJoke(event.target.value)
        }} />
        <button className="joke-input-submit" onClick={(event) => { createNewJoke(transientState), setNewJoke("") }}>Add</button>
      </div>
      
      <div className="joke-lists-container">
      <div className="joke-list-container">
        <h2>Told<span className="told-count"> {toldJokes.length}</span></h2>
        <div >
          {toldJokes.map(joke => {
            return (
              <div className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <div className="joke-list-action-toggle"><button className="joke-list-action-toggle" onClick={() => handleToldStatus(joke.id)}> <i className="fa-regular fa-face-smile" /></button></div>
                <div className="joke-list-action-toggle"><button className="joke-list-action-delete" onClick={() => handleDeleteJoke(joke.id)}> <i className="fa-solid fa-trash" /></button></div>
              </div>
            )
          })}
        </div>
        </div>
        <div className="joke-list-container">
        <div className="joke-list-container">
          <h2> UnTold <span className="untold-count">{untoldJokes.length}</span></h2>
          <div >
            {untoldJokes.map(joke => {
              return (
                <div className="joke-list-item" key={joke.id}>
                  <div className="joke-list-item-text">{joke.text}</div>
                  <div className="joke-list-action-toggle"><button className="joke-list-action-toggle" onClick={() => handleToldStatus(joke.id)}><i className="fa-regular fa-face-meh" /></button></div>
                  <div className="joke-list-action-toggle"><button  className="joke-list-action-delete"onClick={() => handleDeleteJoke(joke.id)}><i className="fa-solid fa-trash" /></button></div>                
                </div>
              )
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
