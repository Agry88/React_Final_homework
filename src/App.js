import { Box, Grid } from '@mui/material';
import Navbar from "./Components/Navbar";
import Detail from "./Components/Detail";
import IndexPage from "./Pages/IndexPage";
import Footer from "./Components/Footer";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Box
          sx={{
            width: 800,
            height: 900,
            backgroundColor: "#f0efed",
            display: 'flex',
            alignContent: "space-between",
            justifyContent: "center",
            border:1,
            borderColor: '#bebfc2',
          }}>
          <Content />  {/* 引入Content */}
        </Box>
      </Grid>
    </div>
  );
}

export default App;


function Content() {
  return (
    <Router>
      <Grid
        container
        spacing={0}
        direction="column"
        >

        <Navbar /> {/* 引入最上方的Navbar區塊 */}
        <Detail /> {/* 引入篩選條件區塊 */}
        <IndexPage /> {/* 引入放置Card的區塊 */}
        <Footer/> {/* 引入最下方的Footer */}

      </Grid>
    </Router>
  );
}