import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './componets/Header'
import { LectureControls } from './componets/LectureControls'
import { LectureScreen } from './componets/LectureScreen'
import { SocketProvider } from './services/SocketContext'
import { useState } from 'react';
import { ChooseRole } from './pages/ChooseRole';

function App() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<ChooseRole />} />
        <Route
          path='/lecturer'
          element={
            <SocketProvider>
              <div className='flex gap-10 my-10 px-15 w-full h-[80%]'>
                <LectureControls setStream={setStream} />
                <LectureScreen stream={stream}/>
              </div>
            </SocketProvider>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
