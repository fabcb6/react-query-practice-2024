import { useInfiniteQuery } from '@tanstack/react-query';

async function fetchInfiniteScrollPokemons({ pageParam = 0 }) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${pageParam}`);
  if (!response.ok) {
    throw new Error('Failed to fetch infinite scroll Pokemons');
  }
  return response.json();
}

export function useInfiniteScrollPokemons() {
  return useInfiniteQuery({
    queryKey: ['infiniteScrollPokemons'], // Unique key for the infinite query
    queryFn: fetchInfiniteScrollPokemons, // Fetch function
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length * 10; // Calculate next offset based on current pages length
      return lastPage.next ? nextPage : undefined; // Return next page if available
    },
  });
}
