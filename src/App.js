import './App.css';
import Typography from '@mui/material/Typography';
import TabList from './components/TabList';
import Toolbar from '@mui/material/Toolbar';
import { AppBar } from '@mui/material';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            TrainingList
          </Typography>
        </Toolbar>
      </AppBar>
      <TabList />
    </div>
  );
}

export default App;
