import '@components/App.scss';
import Typography from '@components/Typography';
import Paper from '@components/Paper';

function App() {
  return (
    <Paper>
      <Typography
        variant="h1"
        transform="uppercase"
      >
        Hello world!
      </Typography>
    </Paper>
  );
}

export default App;
