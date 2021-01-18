import './App.css';
import {createFFmpeg,fetchFile} from '@ffmpeg/ffmpeg';
import { useEffect,useState } from 'react';
import '../node_modules/bulma/css/bulma.min.css'
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
    await ffmpeg.run('-i','test.mp4','-t','10','-ss','2.0','-f','gif','out.gif');
    const data = ffmpeg.FS('readFile','out.gif');
    const url = URL.createObjectURL(new Blob([data.buffer],{type:'image/gif'}));
    setGif(url);
  }
  return ready ? (
    <div className="App">
      {video && <video
                controls
                width="250"
                src={URL.createObjectURL(video)}   
                ></video>}

    <input  className="button is-info" type="file" onChange={(e)=>setVideo(e.target.files?.item(0))}/>
    <button onClick={convertToGif} className="button is-danger">Convert</button>
    { gif && <img src={gif} alt="converted gif"/> }
    </div>
  ):
  (<p>Loading...</p>)
}

export default App;
