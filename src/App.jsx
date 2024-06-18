import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [number , setNumber]=useState(false)
  const[character , setCharacter]=useState(false)
  const[password,setPassword]=useState("")

  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) {
      str+="0123456789"
    }
    if (character) {
       str+="!@#$%^&*()"
    }
  for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }
    
    setPassword(pass)


  } , [length,number,character,setPassword])

  const copyPasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,5);
  window.navigator.clipboard.writeText(password)

  },[password])
  useEffect(() => {
    passwordGenerator()

  },[length,number,character,passwordGenerator])
  

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-medium rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
    <h1 className='text=white text-center my-3'>password generator</h1>
      <div className='className=" flex shadow rounded-lg overflow-hidden mb-4"'>
      <input 
      type="text"
      value={password}
      className='online-nope w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef}
      />
<button 
onClick={copyPasswordtoClipboard}
className='bg-blue-700'>copy</button>

      </div>
      <div className='flex justify-between mb-4'>
        <div className='flex items-center gap-x-1'>
          <input
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length :{length}</label>
          <input
          type="checkbox"
          defaultChecker={number}
          id='numberInput'
          onChange={(e)=>{setNumber((prev) => !prev);

          }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
          <input
          type="checkbox"
          defaultChecker={character}
          id='characterInput'
          onChange={(e)=>{setCharacter((prev) => !prev);
          }}
          />
         <label htmlFor="characterInput">Characters</label>
          </div>

           

        </div>
    </div>
    </>
  )
}

export default App
