import logo from './logo.svg';
import postData from './helpres/fetch';
import './App.css';
import {useEffect, useState} from "react";


const LongPolling =(props)=>{
  const[messages,setMessages]=useState([]);
  const[message,setMessage]=useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
    postData('http://localhost:3001/messages', { message })
        .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
        setMessage('');
        });
  }
  useEffect(()=>{
    fetch('http://localhost:3001/messages/subscribe')
        .then((res) => res.json())
        .then((data) =>{
          // messages.push(message)
          setMessages(messages.concat(data))
        })
  },[messages])
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





export default LongPolling;
