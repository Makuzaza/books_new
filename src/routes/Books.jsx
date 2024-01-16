import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import useAxios from '../services/useAxios';
import { bookGenres } from '../genres';


function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const {data, loading, get} = useAxios('http://localhost:3000/books');
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);

  // TODO: Replace axios with useAxios hook
  // Replace the current axios.get function in Books.js with the useAxios custom hook without altering the existing functionality.
  function getBooks() {
    get(data)
  }

  const searchHandler = (event) => {
    setSearch(event.target.value.toLowerCase());
  }

  //  toggling of the selected genres
  const handleGenre = (genre) => () => {
    // event handler when the checkbox is clicked
    // if genre is already in selectedGenres
    const updatedGenres = selectedGenres.includes(genre) // checked/unchecked
      ? selectedGenres.filter((g) => g !== genre) // remove genre
      : [...selectedGenres, genre]; // checked genre, adds it to the array
    setSelectedGenres(updatedGenres); // updates the array
  };

  const filterByGenres = (book) => {
    if (selectedGenres.length === 0) // no genre filtering
    return true;
    // if at least one of the genres is selected 
    return book.genres.some((genre) => selectedGenres.includes(genre));
  };

  // search feature by name or author
  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <TextField variant="outlined" label="Search"  onChange={searchHandler} 
            sx={{ marginBottom: '20px'}}/>
           <Box sx={{ marginBottom: '20px' }}>  {/* container for the checkboxes */}
           {/* each genre in the bookGenres array */}
            {bookGenres.map((genre) => ( 
              <FormControlLabel // component that combines a label with an input 
              key={genre}
                control={
                  <Checkbox
                    checked={selectedGenres.includes(genre)} // current check
                    onChange={handleGenre(genre)} // changes
                  />
                }
                label={genre} // name of the genre
              />
            ))}
          </Box>
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >     
      {data
      .filter((book, index) => (book.name.toLowerCase().includes(search.toLowerCase()) || 
      book.author.toLowerCase().includes(search.toLowerCase()))  &&
      filterByGenres(book))
      .map((book, index) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={index}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                  <Button size="small"><Link to={`/${book.id}`}>Learn More</Link></Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;