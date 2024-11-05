import { useMutation, useQueryClient } from '@tanstack/react-query';

type FavoriteResponse = {
  success: boolean;
  message: string;
};

async function favoritePokemon(id: number): Promise<FavoriteResponse> {
  
  // Simulating a POST request to mark a Pokémon as favorite on the server
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {  // Fake server
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorite: true, pokemonId: id }),
  });
  // // Simulate a delay of 2 seconds
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  
  if (!response.ok) {
    throw new Error('Failed to mark Pokémon as favorite');
  }
  
  return response.json();
}

// React Query hook to handle the mutation
export function useFavoritePokemon() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => favoritePokemon(id),
    onSuccess: () => {
      // Invalidate and refetch the Pokémon list to get updated data
      queryClient.invalidateQueries(['pokemons']);
    },
  });
}
