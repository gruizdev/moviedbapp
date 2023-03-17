import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider } from './AppContext';
import { PopularMovies } from './pages/PopularMovies';
import { SearchMovies } from './pages/SearchMovies';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
          {/* <PopularMovies /> */}
          <SearchMovies />      
      </AppProvider>
    </QueryClientProvider>

  );
}

export default App;
