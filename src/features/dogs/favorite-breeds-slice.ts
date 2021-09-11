import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Breed {
  name: string;
}

const initialState: Breed[] = [{
  name: 'Jordan'
}]

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