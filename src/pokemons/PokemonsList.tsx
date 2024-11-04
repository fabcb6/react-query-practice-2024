import { useGetPokemons } from './useGetPokemons';
import { Link } from 'react-router-dom';
import { CircularProgress, Stack, Card, CardMedia, CardContent, Typography } from '@mui/material';

function PokemonsList() {
  const { data, error, isLoading } = useGetPokemons();
  
  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center" style={{ padding: '20px' }}>
      {data?.results.map((pokemon) => (
        <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id} style={{ textDecoration: 'none' }}>
          <Card style={{ width: '200px', margin: '10px' }}>
            <CardMedia
              component="img"
              height="200"
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <CardContent>
              <Typography variant="h5" component="div" textAlign="center">
                {pokemon.name}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Stack>
  );
}

export default PokemonsList;
