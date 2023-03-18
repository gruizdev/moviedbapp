import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider } from './AppContext';
import { PopularMovies } from './pages/PopularMovies';
import { SearchMovies } from './pages/SearchMovies';
import { Routes, Route, Link } from 'react-router-dom';
import { MyList } from './pages/MyList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
          <h1>Movie DB app</h1>        
          <Layout />
          <Routes>
            <Route path='/' element={<PopularMovies />} />
            <Route path="search" element={<SearchMovies />} />
            <Route path='mylist' element={<MyList />} />
          </Routes>
      </AppProvider>
    </QueryClientProvider>

  );
}

const Layout = () => {
  return (
    <div>      
      <nav>
        <ul>
          <li>
            <Link to="/">Popular</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/mylist">My list</Link>            
          </li>
        </ul>
      </nav>
      <hr />      
    </div>
  );
}

export default App;
