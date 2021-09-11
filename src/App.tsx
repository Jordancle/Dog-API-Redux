import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counter-slice';
import logo from './logo.svg'
import './App.css'
import { useFetchBreedsQuery } from './features/dogs/dogs-api-slice';
import DisplayImage from './display-image';
import { addFavoriteBreed } from './features/dogs/favorite-breeds-slice';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const favoriteBreeds = useAppSelector((state) => state.favoriteBreeds);
  const dispatch = useAppDispatch();

  const [searchBreed, setSearchBreed] = useState('');
  const { data = [], isLoading } = useFetchBreedsQuery(searchBreed);

  function showDogList(isLoading: boolean, handleClick) {
    if (!isLoading) {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {data.map((breed) => (
              <button onClick={() => handleClick(breed.name)}>
                <tr key={breed.id}>
                  <td>{breed.name}</td>
                  <td>
                    {
                      breed.reference_image_id &&
                      <DisplayImage reference_image_id={breed.reference_image_id} />
                      || 'No Image'
                    }
                  </td>
                </tr>
              </button>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return 'Loading...';
    }
  }

  function handleClick(breedName) {
    dispatch(addFavoriteBreed({name: breedName}))
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <p>
          <button onClick={handleClick}>
            count is: {count}
          </button>
        </p> */}
        {<p>
          Favorite Breeds are: {JSON.stringify(favoriteBreeds)}
        </p>}

        <div>
          <p>Dogs to fetch:</p>
          {/* <select value={searchBreed} onChange={(e) => setSearchBreed(Number(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select> */}
        </div>

        <p>Number of dogs fetched: {data.length}</p>
        <input onChange={(e) => setSearchBreed(e.target.value)}></input>

        {showDogList(isLoading, handleClick)}

        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
