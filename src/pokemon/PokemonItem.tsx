import { useParams, useNavigate } from 'react-router-dom';
import { useGetPokemon } from './useGetPokemon';
import { CircularProgress, Card, CardContent, CardMedia, Typography, List, ListItem, Button } from '@mui/material';

function PokemonItem() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetPokemon(name as string);
  
  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <>
      <Button onClick={() => navigate(-1)} variant="contained" color="primary" style={{ margin: '20px' }}>
        Back
      </Button>
      <Card style={{ maxWidth: '400px', margin: '20px auto', padding: '10px' }}>
        <CardMedia
          component="img"
          height="400"
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`}
          alt={data?.name}
        />
        <CardContent>
          <Typography variant="h5" component="div" textAlign="center">
            {data?.name}
          </Typography>
          <Typography variant="h6" component="div" marginTop="20px">
            Moves:
          </Typography>
          <List>
            {data?.moves.map((move, index) => (
              <ListItem key={index}>{move.move.name}</ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
}

export default PokemonItem;
