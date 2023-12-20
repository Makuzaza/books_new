import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';

const SinglePage = ({ books }) => {
  const params = useParams();
  const navigate = useNavigate();

let bookArray = books;
let data = bookArray.find((book) => book.id === parseInt(params.id, 10));

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Card sx={{ width: 350, margin: 1 }}>
      <CardMedia
        sx={{ height: 450 }}
        image={data.img}
        title={data.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        About {data.name.toUpperCase()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        By {data.author.toUpperCase()}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1.5 }}>
        Description will be here
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(-1)}>Go back</Button>
      </CardActions>
    </Card></div>
  );
}

export default SinglePage;