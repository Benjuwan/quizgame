import { Header } from "./layout/Header";
import { FirstViewer } from "./FirstViewer";
import { Footer } from "./layout/Footer";

export const App = () => {
  return (
    <div className="RootWrapper">
      <Header />
      <FirstViewer />
      <Footer />
    </div>
  );
}