import { useQuery } from '@tanstack/react-query';

async function fetchPaginatedPokemons(page: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`);
  if (!response.ok) {
    throw new Error('Failed to fetch paginated Pokemons');
  }
  return response.json();
}

export function usePaginatedPokemons(page: number) {
  return useQuery({
    queryKey: ['pokemons', page], // Unique key for this query
    queryFn: () => fetchPaginatedPokemons(page), // Fetch function
    keepPreviousData: true, // Keep previous data while loading new data
  });
}
