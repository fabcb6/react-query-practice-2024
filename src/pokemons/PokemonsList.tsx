import { useGetPokemons } from './useGetPokemons';
import { Link } from 'react-router-dom';
import { CircularProgress, Stack, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

function PokemonsList() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useGetPokemons();
  
  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center" style={{ padding: '20px' }}>
      {data?.results.map((pokemon) => {
        // Extracting the Pokémon ID from the URL
        const pokemonId = pokemon.url.split('/')[6];
        
        return (
          <Card
            key={pokemon.id}
            style={{ width: '200px', margin: '10px' }}
            onMouseEnter={() => {
              // Prefetch Pokémon data on mouse enter
              queryClient.prefetchQuery({
                  queryKey: ['pokemon', pokemon.name], // Make sure this is an array
                  queryFn: async () => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                    if (!res.ok) throw new Error('Failed to fetch Pokémon');
                    return res.json();
                  },
                staleTime: 1000 * 60 * 5, // 5 minutes - data is considered fresh for this duration
                cacheTime: 1000 * 60 * 30, // 30 minutes - cache remains even after becoming stale
                }
              );
            }}
          >
            <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none' }}>
              <CardMedia
                component="img"
                height="200"
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                alt={pokemon.name}
              />
              <CardContent>
                <Typography variant="h5" component="div" textAlign="center">
                  {pokemon.name}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        );
      })}
    </Stack>
  );
}

export default PokemonsList;
