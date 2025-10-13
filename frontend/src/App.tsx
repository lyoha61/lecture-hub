import { Header } from './componets/Header'
import { LectureControls } from './componets/LectureControls'
import { SocketProvider } from './services/SocketContext'

function App() {

  return (
    <>
      <Header />
      <SocketProvider>
        <div className='my-10 mx-15 w-full h-[80%]'>
          <LectureControls />

        </div>
      </SocketProvider>
    </>
  )
}

export default App
