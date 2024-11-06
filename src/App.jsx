import { useState,useCallback,useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [noAllowed, setNoAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (noAllowed) str += "0123456789";
    if (charAllowed) str += "@!#$%^&*-_=+~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, noAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, noAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <h1 className="text-center text-lime-400 text-8xl mt-[15%]">Password Generator</h1>
      <div className='w-full h-35 max-w-xl mx-auto shadow-md rounded-lg px-4 my-8 text-red-600 bg-blue-200'>
        <div className='flex shadow mt-[30px] h-[30] rounded-lg overflow-x-hidden mb-4 my-3'>
          <input type="text" value={password} className='outline-none text-8px text-black w-full mt-[10px] py-1 px-3' placeholder='password' ref={passwordRef} readOnly />
          <button onClick={copyPasswordToClipboard} className='outline-none mt-[10px] hover:bg-green-500 bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className="flex text-m gap-x-2">
          <div className='flex items-center mb-3 gap-x-2'>
            <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e) => setLength(e.target.value)} />
            <label> length:{length} </label>
          </div>

          <div className='flex mb-3 items-center gap-x-0.5'>
            <input type="checkbox" defaultChecked={noAllowed} id="numberInput" onChange={() => setNoAllowed(prev => !prev)} />
            <label htmlFor='numberInput'> Numbers</label>
          </div>

          <div className='flex items-center mb-3 gap-x-0.5'>
            <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={() => setCharAllowed(prev => !prev)} />
            <label htmlFor='charInput'> Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
