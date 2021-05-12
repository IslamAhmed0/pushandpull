import logo from './logo.svg';
import postData from './helpres/fetch';
import './App.css';
import {useEffect, useState} from "react";


const SSE =(props)=>{
  const[messages,setMessages]=useState([]);
  const[message,setMessage]=useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
    postData('http://localhost:3001/messagesSubscribe', { message })
        .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
          setMessage('');
        });
  }
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/subscribe')
    eventSource.onmessage = (e) => {
      setMessages(oldMessage=> oldMessage.concat(JSON.parse(e.data)))
    }
  }, [])

  return(
      <>
        <div className="form-wrapper">
          <form id="form" className="validate" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>messages</label>
              <input type="text" name="message" id="message" placeholder="message" onChange={(e)=>setMessage(e.target.value)} value={message}/>
            </div>

          </form>
        </div>
        <section>
          <div>
            <h1>messages</h1>
            <ul className="check-list">
              {

                messages.map((m, i) => <li key={i}>{m.message}</li>)
              }
            </ul>
          </div>

        </section>
      </>

  )
}





export default SSE;
