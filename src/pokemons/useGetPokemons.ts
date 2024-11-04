// pokemons/useGetPokemons.ts
import { useQuery } from '@tanstack/react-query';

type Pokemon = {
  name: string;
  url: string;
  id: number;
};

type PokemonsResponse = {
  results: Pokemon[];
};

async function fetchPokemons(): Promise<PokemonsResponse> {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=30');
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon');
  }
  const data = await response.json();
  return {
    results: data.results.map((pokemon: { name: string; url: string }) => {
      const id = parseInt(pokemon.url.split('/').slice(-2)[0], 10);
      return { ...pokemon, id };
    }),
  };
}

export function useGetPokemons() {
  return useQuery({
    queryKey: ['pokemons'],
    queryFn: fetchPokemons,
  });
}
