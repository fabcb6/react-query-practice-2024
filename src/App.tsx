import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonsList from './pokemons/PokemonsList';
import PokemonItem from './pokemon/PokemonItem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonsList />} />
        <Route path="/pokemon/:name" element={<PokemonItem />} />
      </Routes>
    </Router>
  );
}

export default App;
