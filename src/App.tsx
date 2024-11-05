import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PokemonsList from './pokemons/PokemonsList';
import PokemonItem from './pokemon/PokemonItem';
import PaginatedPokemonsList from './pagination/PaginatedPokemonsList';
import InfiniteScrollPokemonsList from './infiniteScroll/InfiniteScrollPokemonsList';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<PokemonsList />} />
          <Route path="/pokemon/:name" element={<PokemonItem />} />
          <Route path="/pagination" element={<PaginatedPokemonsList />} />
          <Route path="/infinite-scroll" element={<InfiniteScrollPokemonsList />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
