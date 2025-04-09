import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import Game from './pages/Game';
import GameForCategories from './pages/GameForCategories';
import GameByTitle from './pages/GameByTitle';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/games" element={<Game />} />
          <Route path="/genre/:id" element={<GameForCategories />} />
          <Route path="/game-title/:id" element={<GameByTitle />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;