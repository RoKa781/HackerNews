import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import HomePage from './pages/HomePage/HomePage';
import NewsPage from './pages/NewsPage/NewsPage';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<NewsPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;