import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Teachers from './pages/Teachers';
import Favorites from './pages/Favorites';

const App = () => (
  <>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
      </Routes>
    </main>
  </>
);

export default App;
