import './App.css'

function App() {
  return (
    <div className="w-full bg-slate-950 min-h-screen text-white">
      <div className="max-w-screen-2xl mx-auto space-y-4">
        <h1 className="font-bold text-center py-[0.5em] text-min-6xl text-max-9xl">Scaled</h1>
        <div className="breakpoint-container">
          <span className="breakpoint-line" />
          <span className="breakpoint-label">Breakpoint A (screen-2xl)</span>
        </div>

        <div className="breakpoint-container max-w-screen-sm">
          <span className="breakpoint-line" />
          <span className="breakpoint-label">Breakpoint B (screen-sm)</span>
        </div>
      </div>
    </div>
  )
}

export default App
