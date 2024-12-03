import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzNjNjM1NGNiYmQ3OWUzYTlmNTk4YzE4ZmY0MTkyOSIsIm5iZiI6MTczMTg5ODcxNC42MzA4NTcyLCJzdWIiOiI2NzM4MTJkZDRkNDc3MTQwY2UzYWQ0NDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KGUZL7SG1uyuhYVkDrvA6SCQpsRSxhQfhP_1lmQJwV0',
    },
  };

  const handlewheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => setApiData(data.results))
      .catch((err) => console.error(err));

    const currentCardsRef = cardsRef.current;
    currentCardsRef.addEventListener('wheel', handlewheel);

    return () => {
      currentCardsRef.removeEventListener('wheel', handlewheel);
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData?.length > 0 ? (
          apiData.map((card, index) => (
            <Link to={`/player/${card.id}`}className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title}
              />
              <p>{card.original_title}</p>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
