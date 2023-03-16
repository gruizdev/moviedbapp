import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MoviesList } from './components/MoviesList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MoviesList />      
    </QueryClientProvider>
  );
}

export default App;
