import { useState } from "react"

const ThingSpeak = () => {
  const [channelId, setChannelId] = useState('')
  const [readApiKey, setReadApiKey] = useState('')
  const [writeApiKey, setWriteApiKey] = useState('')
  const [clientId, setClientId] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <form>
        <div>
          <label>Channel ID</label>
          <input  
            className="form-control"
            placeholder="Channel ID"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
          />  
        </div>
        <br />
        <div>
          <label>Read API Key</label>
          <input  
            className="form-control"
            placeholder="Read API Key"
            value={readApiKey}
            onChange={(e) => setReadApiKey(e.target.value)}
          />  
        </div>
        <br />
        <div>
          <label>Write API Key</label>
          <input  
            className="form-control"
            placeholder="Write API Key"
            value={writeApiKey}
            onChange={(e) => setWriteApiKey(e.target.value)}
          />  
        </div>
        <br />
        <div>
          <label>Client ID</label>
          <input  
            className="form-control"
            placeholder="Client ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />  
        </div>
        <br />
        <div>
          <label>Username</label>
          <input  
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />  
        </div>
        <br />
        <div>
          <label>Password</label>
          <input 
            type="password" 
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default ThingSpeak
