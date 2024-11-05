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

// Custom hook to use the fetch function with caching options
export function useGetPokemon(name: string) {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
    staleTime: 1000 * 60 * 5, // 5 minutes - data is considered fresh for this duration
    cacheTime: 1000 * 60 * 30, // 30 minutes - cache remains even after becoming stale
  });
}
