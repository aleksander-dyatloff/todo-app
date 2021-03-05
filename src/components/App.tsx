import '@components/App.scss';
import Typography from '@components/Typography';
import Paper from '@components/Paper';
import { useState } from 'react';
import Button from './Button';
import IconButton from './IconButton';
import CloseIcon from '../icon-components/CloseIcon';
import CheckBox from './CheckBox';
import Input from './Input';

function App() {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('Hello');

  const handleChange = (e: any) => {
    setChecked(e.target.value);
  };

  const handleInputChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Paper style={{ alignItems: 'center', justifyContent: 'space-around' }}>
      <Typography
        variant="h6"
        transform="uppercase"
      >
        Hello world!
      </Typography>
      <Button disabled={checked}>Click</Button>
      <IconButton title="Закрыть" disabled={checked}>
        <CloseIcon />
      </IconButton>
      <CheckBox onChange={handleChange} checked={checked} />
      <Input disabled={checked} value={value} onChange={handleInputChange} placeholder="Todo title..." />
      <Input disabled={checked} variant="textarea" value={value} onChange={handleInputChange} placeholder="Todo description" />
    </Paper>
  );
}

export default App;
