import { Header } from "./layout/Header";
import { FirstViewer } from "./FirstViewer";
import { Footer } from "./layout/Footer";

export const App = () => {
  return (
    <div className="py-[clamp(1em, calc(100vw/2), 2em)] lg:py-[clamp(1em, calc(100vh/4), 2em)]">
      <Header />
      <FirstViewer />
      <Footer />
    </div>
  );
}