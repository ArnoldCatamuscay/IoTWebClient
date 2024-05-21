import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebase/firebase-config";
import { useMqttStore } from "../../store/mqtt-store";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const Account = () => {
  const { user, loading } = useAuth();
  const clientPaho = useMqttStore(state => state.clientPaho);
  const keysSetted = useMqttStore(state => state.keysSetted);
  const clear = useMqttStore(state => state.clear);
  const updateChannelId = useMqttStore(state => state.updateChannelId);
  const updateReadApiKey = useMqttStore(state => state.updateReadApiKey);
  const updateWriteApiKey = useMqttStore(state => state.updateWriteApiKey);
  const updateClientId = useMqttStore(state => state.updateClientId);
  const updateUsername = useMqttStore(state => state.updateUsername);
  const updatePassword = useMqttStore(state => state.updatePassword);
  const updateClientPaho = useMqttStore(state => state.updateClientPaho);
  const updateKeysSetted = useMqttStore(state => state.updateKeysSetted);

  //* Creamos o actualizamos las keys en Firestore
  const {channelId, readApiKey, writeApiKey, clientId, username, password} = useMqttStore();

  const addKeys = () => {
    const keysRef = collection(db, "keys");
    const promise = setDoc(doc(keysRef, user.email), {
      //REST
      channelId: thingSpeak.channelId,
      readApiKey: thingSpeak.readApiKey,
      writeApiKey: thingSpeak.writeApiKey,
      //MQTT
      clientId: thingSpeak.clientId,
      username: thingSpeak.usernameTS,
      password: thingSpeak.passwordTS
    });

    toast.promise(promise, {
      loading: 'Guardando las claves...',
      success: (/*res: any*/) => {
        if(clientPaho.isConnected()) clientPaho.disconnect();
        clear();
        updateKeysSetted(false);
        return 'Claves guardadas correctamente!';
      },
      error: (error: any) => {
        console.log(error)
        return error;
      },
    });
  }

  const [thingSpeak, setThingSpeak] = useState({
    channelId: '',
    readApiKey: '',
    writeApiKey: '',
    clientId: '',
    usernameTS: '',
    passwordTS: '',
  });

  const handleOnChange = ( {target: {name, value}}: any) => {
    setThingSpeak({...thingSpeak, [name]: value})
  }

  // const handleUpdateKeys = () => {
  //   if(thingSpeak.channelId) {
  //     updateChannelId(thingSpeak.channelId);
  //   }
  //   if(thingSpeak.readApiKey) {
  //     updateReadApiKey(thingSpeak.readApiKey);
  //   }
  //   if(thingSpeak.writeApiKey) {
  //     updateWriteApiKey(thingSpeak.writeApiKey);
  //   }
  //   if(thingSpeak.clientId) {
  //     updateClientId(thingSpeak.clientId);
  //     updateClientPaho();
  //   }
  //   if(thingSpeak.usernameTS) {
  //     updateUsername(thingSpeak.usernameTS);
  //   }
  //   if(thingSpeak.passwordTS) {
  //     updatePassword(thingSpeak.passwordTS);
  //   }
  // }

  //* Obtenemos las keys de Firestore para asignarlas en el estado global
  const getKeys = async () => {
    const docRef = doc(db, "keys", user.email);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists() && !keysSetted) { 
      console.log("Document data:", docSnap.data());
      updateChannelId(docSnap.data().channelId);
      updateReadApiKey(docSnap.data().readApiKey);
      updateWriteApiKey(docSnap.data().writeApiKey);
      updateClientId(docSnap.data().clientId);
      updateUsername(docSnap.data().username);
      updatePassword(docSnap.data().password);
      updateClientPaho();
      updateKeysSetted(true); 
    } else if (!docSnap.exists()) {
      console.log("No such document!");
    } else if (keysSetted) {
      console.log("Already set!");
    }
  }

  useEffect(() => {
    getKeys();
  },[]);

  if(loading) return <h1>Loading...</h1>

  return (
    <div className="">

      {/* bottom relative container  */}
      <div className=" md:grid grid-cols-2 md:gap-4 place-items-center my-4 mx-4 grid-cols-equal">

        {/* division with floating form  */}
        <div className="  rounded shadow overflow-hidden text-white">
          {/* form / left div  */}
          <div className="p-2 md:p-4 h-full bg-gray-800 col-span-2">
            <form>
              {/* form top part containing mail icon and heading  */}
              <div className="flex flex-row justify-center items-center p-4 ">
                {/* heading  */}
                <h2 className="text-2xl md:text-3xl font-semibold mr-2">Tu cuenta</h2>

                {/* mail svg icon  */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

              </div>

              <div className="flex justify-center items-center">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg bg-[#2563eb]" src="/profile.webp" alt="User image"/>
              </div>
              
              {/* bottom form with input fields  */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 px-4 text-sm">
                
                {/* Display name  */}
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="font-semibold" htmlFor="displayName">
                    Nombre de usuario
                  </label>
                    <input
                    type="text"
                    className="w-full p-2 bg-[#374151] border-2 border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-white focus:outline-none focus:border-blue-500"
                    name="displayName"
                    id="displayName"
                    placeholder="Nombre de usuario"
                    // onChange={handleOnChange}
                  />
                </div>

                {/* Correo  */}
                <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="font-semibold" htmlFor="userEmail">
                    Correo (read only)
                  </label>
                    <input
                    type="text"
                    className="w-full p-2 bg-[#374151] border-2 border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-white focus:outline-none"
                    name="userEmail"
                    id="userEmail"
                    placeholder="Correo electronico"
                    readOnly={true}
                  />
                </div>
  
              </div>
            </form>

            {/* submit button div  */}
            <div className="sm:flex items-center justify-center gap-4 space-y-4 sm:space-y-0 ms-4 me-4 sm:ms-0 sm:me-0">
              {/* submit button  */}
              {/* text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 */}
              <button onClick={()=>{alert('Boton eliminar cuenta'); }} className="sm:w-auto w-full justify-center py-2 px-4 rounded-md flex items-center gap-2 hover:scale-95 transition-all text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <span className="text-lg">Eliminar cuenta</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>

              </button>
              
              <button onClick={()=>{alert('Boton guardar cambios cuenta'); }} className="sm:w-auto w-full justify-center py-2 px-4 bg-[#1a56db] hover:bg-[#1d4ed8] rounded-md flex items-center gap-2 hover:scale-95 transition-all">
                <span className="text-lg">Guardar Cambios</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" 
                  />
                </svg>
              </button>
            </div>

          </div>
        </div>
        {/* division with floating form  */}
        <div className="rounded shadow overflow-hidden text-white md:mb-0 mb-8"> {/* Clase de la card del formulario */}
          <img src="/account.webp" alt="User image" className="hidden-img"/>
        </div>
      </div>
      {/* bottom relative container  */}
      <div className=" md:grid grid-cols-2 md:gap-4 place-items-center my-4 mx-4 grid-cols-equal">

        {/* division with floating form  */}
        <div className="rounded shadow overflow-hidden text-white md:mb-0 mb-8"> {/* Clase de la card del formulario */}
          <img src="/card-2.webp" alt="User image" className="hidden-img"/>
        </div>
        {/* division with floating form  */}
        <div
          className="  rounded shadow overflow-hidden text-white">
          {/* form / left div  */}
          <div className="p-2 md:p-4 h-full bg-gray-800 col-span-2">
            <form>
              {/* form top part containing mail icon and heading  */}
              <div className="flex flex-row justify-around items-start md:items-center p-4 ">
                {/* heading  */}
                <h2 className="text-2xl md:text-3xl font-semibold">Claves de conexion</h2>

                {/* mail svg icon  */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" 
                  />
                </svg>
              </div>

              {/* bottom form with input fields  */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 px-4 text-sm">
                
                {/* Channel ID  */}
                <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="font-semibold" htmlFor="channelId">
                    Channel ID <span className="text-red-500">&#42;</span>
                  </label>
                    <input
                    type="text"
                    className="w-full p-2 bg-[#374151] border-2 border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-white focus:outline-none focus:border-blue-500"
                    name="channelId"
                    id="channelId"
                    placeholder={channelId}
                    onChange={handleOnChange}
                  />
                </div>

                {/* Read Api Key  */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="readApiKey">
                    Read Api Key <span className="text-red-500">&#42;</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 bg-[#374151] border-2 border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-white focus:outline-none focus:border-blue-500"
                    name="readApiKey"
                    id="readApiKey"
                    placeholder={readApiKey}
                    onChange={handleOnChange}
                  />
                </div>

                {/* Write Api Key  */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="writeApiKey">
                    Write Api Key <span className="text-red-500">&#42;</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 bg-[#374151] border-2 border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-white focus:outline-none focus:border-blue-500"
                    name="writeApiKey"
                    id="writeApiKey"
                    placeholder={writeApiKey}
                    onChange={handleOnChange}
                  />
                </div>

                {/* Client ID  */}
                <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="font-semibold" htmlFor="clientId">
                    Client ID <span className="text-red-500">&#42;</span>
                  </label>
                    <input
                    type="text"
                    className="w-full p-2 bg-[#374151] border-2 border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-white focus:outline-none focus:border-blue-500"
                    name="clientId"
                    id="clientId"
                    placeholder={clientId}
                    onChange={handleOnChange}
                  />
                </div>

                {/* Username  */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="usernameTS">
                    Username <span className="text-red-500">&#42;</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 bg-[#374151] border-2 border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-white focus:outline-none focus:border-blue-500"
                    name="usernameTS"
                    id="usernameTS"
                    placeholder={username}
                    onChange={handleOnChange}
                  />
                </div>  

                {/* Password  */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="passwordTS">
                    Password <span className="text-red-500">&#42;</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 bg-[#374151] border-2 border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-white focus:outline-none focus:border-blue-500"
                    name="passwordTS"
                    id="passwordTS"
                    placeholder={password}
                    onChange={handleOnChange}
                  />
                </div>  

              </div>
            </form>

            {/* submit button div  */}
            <div className="flex items-center justify-center md:justify-end">
              {/* submit button  */}
              <button onClick={()=>{console.log(thingSpeak); addKeys();}} className="py-2 px-4 bg-[#1a56db] hover:bg-[#1d4ed8] rounded-md flex items-center gap-2 hover:scale-95 transition-all">
                <span className="text-lg">Guardar Cambios</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" 
                  />
                </svg>
              </button>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  )
}
  
export default Account
  