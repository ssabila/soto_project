import OpeningSequence from './sections/opening'
// import OpeningSection  from './sections/opening'
import QuestionSection from './sections/question'
// import JourneySection  from './sections/journey'
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