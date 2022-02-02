import Loading from "./components/Loading";
import Routes from "./Routes";
import { ThemeProvider } from '@mui/material'
import MainTheme from './Themes/MainTheme'
import Alert from "./components/Alert";


function App() {
  return (
    <>
      <ThemeProvider theme={MainTheme}>
        <Alert/>
        <Loading/>
        <Routes/>
      </ThemeProvider>
    </>
  )
}

export default App;
