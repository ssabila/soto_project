import OpeningSequence from './sections/opening'
// import OpeningSection  from './sections/opening'
import QuestionSection from './sections/question'
// // import JourneySection  from './sections/journey'
// import UnitySection    from './sections/unity'
// import MeaningSection  from './sections/meaning'
// import ClosingSection  from './sections/closing'
// import MakeYourOwn    from './sections/makeyourown'
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
      {/* <OpeningSection  /> */}
      <QuestionSection />
      {/* <JourneySection  /> */}
      {/* <UnitySection    /> */}
      {/* <MeaningSection  /> */}
      {/* <ClosingSection  /> */}
      {/* <MakeYourOwn     /> */}
    </main>
  )
}

export default App