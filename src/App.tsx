import { useContext } from "react";
import { QuestionCounterContext } from "./providers/QuestionCounterContext";
import { Header } from "./layout/Header";
import { FirstViewer } from "./FirstViewer";
import { Footer } from "./layout/Footer";

export const App = () => {
  const { questionCounter } = useContext(QuestionCounterContext);

  return (
    <div className={`RootWrapper bodyColor_0${questionCounter}`}>
      <Header />
      <FirstViewer />
      <Footer />
    </div>
  );
}