import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Breed } from './dogs-api-slice';

const initialState: Breed[] = [];

const FavoriteBreedsSlice = createSlice({
  name: 'favoriteBreeds',
  initialState,
  reducers: {
    // Add favorite breed
    addFavoriteBreed(state, action: PayloadAction<Breed>) {
      state.push(action.payload);
    },
  }
})

export const { addFavoriteBreed } = FavoriteBreedsSlice.actions;
export default FavoriteBreedsSlice.reducer;