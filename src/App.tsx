import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counter-slice';
import logo from './logo.svg'
import './App.css'
import { useFetchBreedsQuery, Breed } from './features/dogs/dogs-api-slice';
import DisplayImage from './display-image';
import { addFavoriteBreed } from './features/dogs/favorite-breeds-slice';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import FormSelect from 'react-bootstrap/FormSelect';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const favoriteBreeds = useAppSelector((state) => state.favoriteBreeds);
  const dispatch = useAppDispatch();

  const [searchBreed, setSearchBreed] = useState('');
  const { data = [], isLoading } = useFetchBreedsQuery(searchBreed);
  const [searchLimit, setSearchLimit] = useState(5);
  const [breedsPage, setBreedsPage] = useState(1);
  const [favoriteBreedsPage, setFavoriteBreedsPage] = useState(1);
  const nextPage = () => setBreedsPage(breedsPage + 1);
  const prevPage = () => setBreedsPage(breedsPage - 1);
  const resetPage = () => setBreedsPage(1);

  function showBreedsList(data: Breed[], isLoading: boolean, page: number) {
    if (!isLoading) {
      let startIndex = (page-1)*searchLimit;
      return (
        <div>
          <table>
            <thead>
              <tr>
                {/* <th>Name</th>
                <th>Picture</th> */}
              </tr>
            </thead>
            <>
              {data.slice(startIndex, startIndex + searchLimit).map((breed) => (
                <Button onClick={() => handleClick(breed)}>
                <Row key={breed.id}>
                  <Col>{breed.name}</Col>
                  <Col>
                    {
                      breed.reference_image_id &&
                      <DisplayImage reference_image_id={breed.reference_image_id} />
                      || 'No Image'
                    }
                  </Col>
                </Row>
              </Button>
              ))}
            </>
          </table>
        </div>
      )
    } else {
      return 'Loading...';
    }
  }

  function handleClick(breed: Breed): void {
    dispatch(addFavoriteBreed(breed));
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Dogs to fetch:</p>
          <FormSelect value={searchLimit} onChange={(e) => {
            setSearchLimit(Number(e.target.value));
            setBreedsPage(1);
          }}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </FormSelect>
        </div>
        <div>
          <Button onClick={prevPage}
            disabled={breedsPage <= 1}>Previous Page</Button>
          <Button onClick={nextPage}
            disabled={data.length <= breedsPage*searchLimit}>Next Page</Button>
        </div>
        <div>
          Current Page: {breedsPage}
        </div>

        <p>Number of dogs fetched: {data.length}</p>
        <input onChange={(e) => {
          setSearchBreed(e.target.value)
          resetPage();  
        }}></input>
        Favorite Breeds List:
        {showBreedsList(favoriteBreeds, isLoading, favoriteBreedsPage)}

        Breeds List:
        {showBreedsList(data, isLoading, breedsPage)}

      </header>
    </div>
  )
}

export default App
