import Navbar from './components/Navbar';
import FooterWeb from './components/Footer';
import { HomePage } from './pages/HomePage';
import {Contact} from './pages/Contact';
import { AuthContextProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import { Media } from './pages/Media';
import { MediaView } from './pages/MediaView';
import { PasswordUpdate } from './pages/PasswordUpdate';


function App() {
  return (
    <div className='container min-h-screen min-w-full bg-gradient-to-r from-[#3494e6] to-[#ec6ead]'>
      <div className='custom-bg bg-blend-overlay bg-opacity-60'>
        
        <AuthContextProvider>
        <Navbar />
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/media' element={<Media />} />
              <Route path='/media/target' element={<MediaView />} />
              <Route path='/password_update' element={<PasswordUpdate />} />
              <Route path='/contact' element={<Contact />} />
          </Routes>

        </AuthContextProvider>
        
        <FooterWeb  />
      </div>
    </div>

  );
}

export default App;
