import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  
const [length, setLength] = useState(6)
const [numAllowed, setNumAllowed] = useState(false)
const [charsAllowed, setCharsAllowed ] = useState(false)
const [password, setPassword] = useState('')

const pwref = useRef(null)

const pwGenerator = useCallback(() => {
  let pass = '';
  let str:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  if (numAllowed) str += '0123456789'
  if (charsAllowed) str += '~`!@#$%^&*()_+=-|}{:"<>?/.,\';\]['

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1 )
    pass += str.charAt(char)
       
  }
setPassword(pass)
}, [length, numAllowed, charsAllowed, setPassword])
const copyPasswordToClipboard = useCallback(() => {
  pwref.current?.select();
  window.navigator.clipboard.writeText(password)
}, [password])

useEffect( () => {pwGenerator()}, [length, numAllowed, charsAllowed, pwGenerator])
  return (
    <>
     <div className="w-full max-w-xl mx-auto rounded-lg px-4 py-3 my-8 text-orange-400 bg-slate-800"><h1 className="text-2xl text-center my-3">Password Generator</h1><div className="flex rounded-lg overflow-hidden mb-4">
      <input type="text"
      value={password}
      className="outline-none w-full py-1 px-3"
      ref={pwref}      
      readOnly
      placeholder="Password" />
      <button className="bg-orange-500 text-white px-2" onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
        <input type="checkbox"
          defaultChecked={numAllowed}
          id="numberInput"
          onChange={() => {setNumAllowed((prev) => !prev);
          }}
          />
          <label>Include Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
        <input type="checkbox"
          defaultChecked={charsAllowed}
          id="numberInput"
          onChange={() => {setCharsAllowed((prev) => !prev);
          }}
          />
          <label>Include Special Characters</label>
        </div>


      </div>
      </div>
    </>
  )
}

export default App
