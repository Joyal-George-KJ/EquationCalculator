import React from "react"
import ReadingInfo from "./components/ReadingInfo"

function App() {

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center bg-neutral-700" >
    <form className="w-1/3 flex flex-col p-4 gap-2 flex-wrap bg-neutral-800 text-neutral-100 border-2">
      <ReadingInfo nth={1} />
      <ReadingInfo nth={2} />
      <button type="submit" className="border-2 rounded capitalize py-1 hover:bg-neutral-600">submit</button>   
    </form>
    </div>
  )
}

export default App
