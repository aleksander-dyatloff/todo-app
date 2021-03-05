import '@components/App.scss';
import Typography from '@components/Typography';
import Paper from '@components/Paper';
import Button from './Button';
import IconButton from './IconButton';
import CloseIcon from '../icon-components/CloseIcon';

function App() {
  return (
    <Paper>
      <Typography
        variant="h1"
        transform="uppercase"
      >
        Hello world!
      </Typography>
      <Button>Click</Button>
      <IconButton>
        <CloseIcon />
      </IconButton>
    </Paper>
  );
}

export default App;
