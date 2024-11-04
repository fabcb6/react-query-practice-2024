// pokemon/useGetPokemon.ts
import { useQuery } from '@tanstack/react-query';

type Move = {
  move: {
    name: string;
  };
};

type PokemonDetail = {
  name: string;
  id: number;
  moves: Move[];
};

// Fetch function to get individual Pokémon data by name
async function fetchPokemon(name: string): Promise<PokemonDetail> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }
  return response.json();
}

// Custom hook to use the fetch function with react-query
export function useGetPokemon(name: string) {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
  });
}
