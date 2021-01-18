import './App.css';
import {createFFmpeg,fetchFile} from '@ffmpeg/ffmpeg';
import { useEffect,useState } from 'react';
const ffmpeg = createFFmpeg({log:true});
function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const load = async ()=> {
    await ffmpeg.load();
    setReady(true); 
  }
  useEffect(()=>{
    load();
  },[])
  const convertToGif = async()=>{
    ffmpeg.FS('writeFile','test.mp4',await fetchFile(video));
  }
  return ready ? (
    <div className="App">
      {video && <video
                controls
                width="250"
                src={URL.createObjectURL(video)}   
                ></video>}

    <input type="file" onChange={(e)=>setVideo(e.target.files?.item(0))}/>
    </div>
  ):
  (<p>Loading...</p>)
}

export default App;
