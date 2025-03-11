import { useContext } from "react";
import { QuestionCounterContext } from "./providers/QuestionCounterContext";
import { FetchAnswersDataContext } from "./providers/GetFetchAnswersDataContext";
import { Header } from "./layout/Header";
import { FirstViewer } from "./FirstViewer";
import { Footer } from "./layout/Footer";

export const App = () => {
  const { questionCounter } = useContext(QuestionCounterContext);
  const { fetchAnswersData } = useContext(FetchAnswersDataContext);

  return (
    <div
      className={`RootWrapper bodyColor_0${questionCounter}`}
      style={fetchAnswersData.length > 0 ? { 'height': 'auto' } : undefined}
    >
      <Header />
      <FirstViewer />
      <Footer />
    </div>
  );
}