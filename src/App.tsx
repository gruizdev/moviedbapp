import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider } from './AppContext';
import { PopularMovies } from './pages/PopularMovies';
import { SearchMovies } from './pages/SearchMovies';
import { Routes, Route, Link } from 'react-router-dom';
import { MyList } from './pages/MyList';
import styles from './App.module.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className={styles.App}>
          <h1>Movie DB app</h1>        
          <Navigation />
          <Routes>
            <Route path='/' element={<PopularMovies />} />
            <Route path="search" element={<SearchMovies />} />
            <Route path='mylist' element={<MyList />} />
          </Routes>
        </div>
      </AppProvider>
    </QueryClientProvider>

  );
}

const Navigation = () => {
  return (
    <div>      
      <nav className={styles.navigation}>
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
