import { ModalProvider } from "./components/ModalProvider.jsx";
import { Nav } from "./sections/Nav.jsx";
import { Hero } from "./sections/Hero.jsx";
import { CustomerLogos } from "./sections/CustomerLogos.jsx";
import { Features } from "./sections/Features.jsx";
import { HowItWorks } from "./sections/HowItWorks.jsx";
import { Pricing } from "./sections/Pricing.jsx";
import { Engage } from "./sections/Engage.jsx";
import { News } from "./sections/News.jsx";
import { Footer } from "./sections/Footer.jsx";

// scroll-margin-top keeps anchored sections clear of the fixed nav.
const anchor = { scrollMarginTop: 90 };

export default function App() {
  return (
    <ModalProvider>
      <Nav />
      <Hero />
      <CustomerLogos />
      <div id="platform" style={anchor}>
        <Features />
      </div>
      <div id="how-it-works" style={anchor}>
        <HowItWorks />
      </div>
      <div id="pricing" style={anchor}>
        <Pricing />
      </div>
      <Engage />
      <div id="news" style={anchor}>
        <News />
      </div>
      <Footer />
    </ModalProvider>
  );
}
