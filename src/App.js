import './App.css';
import {createFFmpeg,fetchFile} from '@ffmpeg/ffmpeg';
import { useEffect,useState } from 'react';
const ffmpeg = createFFmpeg({log:true});
function App() {
  const [ready, setready] = useState(false);
  const load = async ()=> {
    await ffmpeg.load();
    setready(true); 
  }
  useEffect(()=>{
    load();
  },[])
  return (
    <div className="App">
      <h1>hi</h1>

    </div>
  );
}

export default App;
