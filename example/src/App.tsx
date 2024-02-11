import './App.css'

function App() {
  return (
    <div className="w-full min-h-screen py-40 space-y-40 text-center text-white bg-black">
      <div className="mx-auto space-y-4 max-w-screen-2xl">
        <h1 className="font-bold text-center py-[0.5em] text-min-2xl text-max-6xl font-mono">
          npm i tailwindcss-text-scale
        </h1>
        <div className="breakpoint-container">
          <span className="breakpoint-line" />
          <span className="breakpoint-label">Max: screen-2xl = text-6xl</span>
        </div>

        <div className="max-w-screen-sm breakpoint-container">
          <span className="breakpoint-line" />
          <span className="breakpoint-label">Min: screen-sm = text-2xl</span>
        </div>
      </div>

      {/* Custom sizes */}
      <div className="mx-auto space-y-4 max-w-screen-2xl">
        <h2 className="font-bold text-center py-[0.5em] text-min-lg text-max-4xl">
          Define the text size using <span className="markup">{'text-min-<size>'}</span> and{' '}
          <span className="markup">{'text-max-<size>'}</span>
        </h2>
        <div className="breakpoint-container">
          <span className="breakpoint-line" />
          <span className="breakpoint-label">Max: screen-2xl = text-4xl</span>
        </div>

        <div className="max-w-screen-sm breakpoint-container">
          <span className="w-screen-sm breakpoint-line" />
          <span className="breakpoint-label">Min: screen-sm = text-xl</span>
        </div>
      </div>

      {/* Cusotom breakpoint */}
      <div className="max-w-screen-lg mx-auto space-y-4">
        <div className="text-screen-min-[300px] text-screen-max-lg">
          <h2 className="font-bold text-center py-[0.5em] text-min-xs text-max-[40px]">
            Change default breakpoints using{' '}
            <span className="markup">{'text-screen-min-<breakpoint>'}</span> and{' '}
            <span className="markup">{'text-screen-max-<breakpoint>'}</span>
          </h2>
        </div>
        <div className="max-w-screen-lg breakpoint-container">
          <span className="breakpoint-line" />
          <span className="breakpoint-label">Max: screen-lg = text-[40px]</span>
        </div>
        <div className="max-w-[300px] breakpoint-container">
          <span className="breakpoint-line" />
          <span className="breakpoint-label">Min: screen-[300px] = text-xs</span>
        </div>
      </div>

      {/* github */}
      <div className="mx-auto space-y-4 max-w-screen-2xl">
        <a
          href="https://github.com/matiasngf/tailwindcss-text-scale"
          target="_blank"
          rel="noreferrer"
          className="block text-blue-500 hover:underline"
        >
          <div>Full docs</div>
        </a>
        <a
          href="https://github.com/matiasngf/tailwindcss-text-scale"
          target="_blank"
          rel="noreferrer"
          className="block text-blue-500 hover:underline"
        >
          <div>Source code</div>
        </a>
      </div>
    </div>
  )
}

export default App
