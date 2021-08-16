import './App.css';
import Index from './pages/Index';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins'
  },
  palette: {
    primary: {
      main: '#2F67C8'
    },
    secondary: {
      main: '#0D2E68'
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Index}></Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
