import './App.css'
import { CodeBlock } from './code-block'

function App() {
  return (
    <div className="w-full min-h-screen py-40 space-y-40 text-center text-white bg-black">
      <div className="space-y-8">
        <h1 className="font-mono font-bold leading-none text-center text-scale-2xl/6xl">
          npm i tailwindcss-text-scale
        </h1>
        <div className="px-4 space-y-4 text-scale-sm/xl">
          <p className="font-bold text-[1.5em]">Get better control of your font sizes.</p>
          <p>Resize your screen to see it in action.</p>
        </div>
        <div className="breakpoint-container max-w-screen-2xl">
          <span className="breakpoint-line" />
          <span className="breakpoint-label">Max breakpoint</span>
        </div>

        <div className="max-w-screen-sm breakpoint-container">
          <span className="breakpoint-line" />
          <span className="breakpoint-label">Min breakpoint</span>
        </div>
      </div>

      {/* Custom sizes */}
      <div className="example-container">
        <div className="mx-auto space-y-4 max-w-screen-2xl">
          <h2 className="font-bold text-center py-[0.5em] text-scale-lg/4xl">
            Define the text size using{' '}
            <span className="markup">{'text-scale-<minSize>/<maxSize>'}</span>.
          </h2>
          <div className="breakpoint-container">
            <span className="breakpoint-line" />
            <span className="breakpoint-label">screen-2xl = text-4xl</span>
          </div>

          <div className="max-w-screen-sm breakpoint-container">
            <span className="w-screen-sm breakpoint-line" />
            <span className="breakpoint-label">screen-sm = text-xl</span>
          </div>
        </div>
        <CodeBlock>{`<h2 className="text-scale-lg/4xl">Text</h2>`}</CodeBlock>
      </div>

      {/* Cusotom breakpoint */}
      <div className="example-container">
        <div className="max-w-screen-lg mx-auto space-y-4">
          <div className="text-screen-[300px]/lg">
            <h2 className="font-bold text-center py-[0.5em] text-scale-xs/[40px]">
              Change default breakpoints using{' '}
              <span className="markup">{'text-screen-<minBreakpoint>/<maxBreakpoint>'}</span>
            </h2>
          </div>
          <div className="max-w-screen-lg breakpoint-container">
            <span className="breakpoint-line" />
            <span className="breakpoint-label">screen-lg = text-[40px]</span>
          </div>
          <div className="max-w-[300px] breakpoint-container">
            <span className="breakpoint-line" />
            <span className="breakpoint-label">screen-[300px] = text-xs</span>
          </div>
        </div>
        <CodeBlock
          summary={`<div className="text-screen-[300px]/lg">`}
        >{`<div className="text-screen-[300px]/lg">
  <h2 className="text-scale-xs/[40px]">
    Text
  </h2>
</div>`}</CodeBlock>
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
      </div>
    </div>
  )
}

export default App
