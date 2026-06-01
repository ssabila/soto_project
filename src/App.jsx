import OpeningSection from './sections/opening'
// import OpeningSection  from './sections/opening'
import QuestionSection from './sections/question'
// import JourneySection  from './sections/journey'
// import UnitySection    from './sections/unity'
// import MeaningSection  from './sections/meaning'
import ClosingSection  from './sections/closing'
import Makeyourownsoto    from './sections/makeyourown'
import FooterSection    from './sections/footer'
import './App.css'
import AboutUs from './sections/about'

function App() {
  return (
    <main className="w-full overflow-x-hidden">
      
      {/* OPENING SECTION */}
      <OpeningSection />

      <QuestionSection />

      {/* <JourneySection /> */}
      {/* <UnitySection /> */}
      {/* <MeaningSection /> */}

      <ClosingSection />

      <div className="relative z-20 -mt-[2px] bg-[#2a1f0e]">
  <Makeyourownsoto />
</div>
      <AboutUs />
      <FooterSection />
    </main>
  )
}

export default App