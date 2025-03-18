import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import LanguageSwitcher from "./components/traduction";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import Activities from "./components/activities";
import AllTours from "./components/allTours";
import DayTrips from "./components/dayTrips";
import Details from "./components/details";


function App() {
  return (
    <Router>
      <Header />
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/AllTours" element={<AllTours />} />
        <Route path="/DayTrips" element={<DayTrips />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;