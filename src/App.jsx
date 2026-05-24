import OpeningSequence from './sections/opening'
import './App.css'

function App() {
  return (
    <main className="w-full overflow-x-hidden">
      
      {/* OPENING SECTION */}
      <OpeningSequence />

      {/* NEXT SECTION */}
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-6xl font-black text-black">
            NEXT SECTION
          </h2>

          <p className="mt-6 text-xl text-neutral-600">
            dummy
          </p>
        </div>
      </section>

    </main>
  )
}

export default App