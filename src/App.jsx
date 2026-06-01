import ScrollNavigator from "./sections/scrollnavigator";
import OpeningSection from "./sections/opening";
import QuestionSection from "./sections/question";
import JourneySection from "./sections/journey";
import UnitySection from "./sections/unity";
import MeaningSection from "./sections/meaning";
import ClosingSection from "./sections/closing";
import Makeyourownsoto from "./sections/makeyourown";
import AboutUs from "./sections/about";
import FooterSection from "./sections/footer";

import "./App.css";

function App() {
  return (
    <main className="w-full overflow-clip">
      <ScrollNavigator />
      {/* OPENING SECTION */}
      <OpeningSection />

      <QuestionSection />
      <JourneySection />
      <UnitySection />
      <MeaningSection />

      <ClosingSection />

      <div className="relative z-20 -mt-[2px] bg-[#2a1f0e]">
        <Makeyourownsoto />
      </div>

      <AboutUs />
      <FooterSection />
    </main>
  );
}

export default App;