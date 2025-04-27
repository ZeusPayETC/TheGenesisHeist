import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Launchpad from './components/Launchpad';
import MintPage from './components/MintPage';
import ComicReader from './components/ComicReader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launchpad />} />
        <Route path="/mint" element={<MintPage />} />
        <Route path="/reader" element={<ComicReader />} />
      </Routes>
    </Router>
  );
}

export default App;
