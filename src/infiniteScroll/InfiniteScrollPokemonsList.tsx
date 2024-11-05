import { useInfiniteScrollPokemons } from './useInfiniteScrollPokemons';
import { Button, Stack, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

function InfiniteScrollPokemonsList() {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useInfiniteScrollPokemons();
  const observer = useRef<IntersectionObserver | null>(null);
  
  const lastPokemonElementRef = (node: any) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    
    if (node) observer.current.observe(node);
  };
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div>
      <Stack direction="column" spacing={2}>
        {data?.pages.map((page) =>
          page.results.map((pokemon: any, index: number) => {
            if (page.results.length === index + 1) {
              return (
                <Card ref={lastPokemonElementRef} key={pokemon.name} style={{ maxWidth: '200px' }}>
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
              );
            }
            return (
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
            );
          })
        )}
      </Stack>
      {isLoading && <p>Loading more...</p>}
    </div>
  );
}

export default InfiniteScrollPokemonsList;
