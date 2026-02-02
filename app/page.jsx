import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/Hero";
import WhatIsIELTS from "@/components/sections/IeltsPage";
import TypesofIelts from "@/components/sections/TypesofIelts";
import ExamStructure from "@/components/sections/ExamSturcture";
import TestDatesPage from "@/components/sections/TestDates";
import PreparingForIELTS from "@/components/sections/PreparationDetails";
import TrainingPage from "@/components/sections/Training";
import ResourcesPage from "@/not-needed/Resources";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhatIsIELTS />
      <TypesofIelts />
      <ExamStructure />
      <TestDatesPage />
      <TrainingPage />
      <PreparingForIELTS />
      <Footer />
    </>
  );
}
