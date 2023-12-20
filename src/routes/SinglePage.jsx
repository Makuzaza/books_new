import React from 'react';
import { useParams, useNavigate } from "react-router-dom";

const SinglePage = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  // const imageUrl = `https://source.unsplash.com/400x400/?${params.name.replace(/_/g, ' ')}`;

let bookArray = props[params.books];
let data = bookArray.find((book) => book.id === parseInt(params.id, 10));
  // let data = bookArray.find(
  //   (book) => book.id === parseInt(params.id, 10)
  // );


  return (
    <main>
      <div>
        {/* <img className="img_singlepage" src={imageUrl} alt={data.name} /> */}
        <h2 className='font_singlepage'>About {data.name.toUpperCase()}</h2>
        <p className='desc'>Description will be here</p>
        <button className='button_singlepage' onClick={() => navigate(-1)}>Go back</button>
      </div>
    </main>
  );
};

export default SinglePage;


    
  
    
    
    