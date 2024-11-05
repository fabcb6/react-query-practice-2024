import { useState } from 'react';
import { usePaginatedPokemons } from './usePaginatedPokemons';
import { Button, Stack, Card, CardContent, CardMedia, Typography } from '@mui/material';

function PaginatedPokemonsList() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = usePaginatedPokemons(page);
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div>
      <Stack direction="row" spacing={2}>
        {data?.results.map((pokemon: any) => (
          <Card key={pokemon.name} style={{ maxWidth: '200px' }}>
            <CardMedia
              component="img"
              height="140"
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
              alt={pokemon.name}
            />
            <CardContent>
              <Typography variant="h6">{pokemon.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Button
        onClick={() => setPage((old) => (data?.next ? old + 1 : old))}
        disabled={!data?.next}
      >
        Next
      </Button>
    </div>
  );
}

export default PaginatedPokemonsList;
