import { useState } from "react"

const ThingSpeakKeys = () => {

  const [thingSpeak, setThingSpeak] = useState({
    channelId: '',
    readApiKey: '',
    writeApiKey: '',
    clientId: '',
    username: '',
    password: '',
  });

  const handleChange = ( {target: {name, value}}: any) => {
    setThingSpeak({...thingSpeak, [name]: value})
  }

  const handleSubmit = () => {
    console.log("Channel ID: ", thingSpeak.channelId);
    console.log("Read Api Key: ", thingSpeak.readApiKey);
    console.log("Write Api Key: ", thingSpeak.writeApiKey);
    console.log("Client ID: ", thingSpeak.clientId);
    console.log("Username: ", thingSpeak.username);
    console.log("Password: ", thingSpeak.password);
  }

  return (
    <div className="flex justify-center mt-4">
    {/* <div className="ml-4 mt-4 mr-4"> */}
      <form className="w-full max-w-sm">
        {/* Channel ID */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="channelId">
              Channel ID
            </label>
          </div>
          <div className="md:w-2/3">
            <input 
              type="text" 
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
              name="channelId"
              id="channelId" 
              placeholder="Your Channel ID"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Read Api Key */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="readApiKey">
              Read Api Key
            </label>
          </div>
          <div className="md:w-2/3">
            <input 
              type="text" 
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
              name="readApiKey"
              id="readApiKey" 
              placeholder="Your Read Api Key"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Write Api Key */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="writeApiKey">
              Write Api Key
            </label>
          </div>
          <div className="md:w-2/3">
            <input 
              type="text" 
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
              name="writeApiKey"
              id="writeApiKey" 
              placeholder="Your Write Api Key"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Client ID */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="clientId">
              Client ID
            </label>
          </div>
          <div className="md:w-2/3">
            <input 
              type="text" 
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
              name="clientId"
              id="clientId" 
              placeholder="Your Client ID"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Username */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input 
              type="text" 
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
              name="username"
              id="username" 
              placeholder="Your Client username"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Password */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input 
              type="text" 
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
              name="password"
              id="password" 
              placeholder="Your Client password"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Button */}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button 
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
              type="button"
              onClick={handleSubmit}
            >
              Connect
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ThingSpeakKeys
