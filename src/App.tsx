import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MoviesList } from './components/MoviesList';
import { IMovie } from './api/MovieDBApi';
import { AppProvider } from './AppContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
          <MoviesList />      
      </AppProvider>
    </QueryClientProvider>

  );
}

export default App;
