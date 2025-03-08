import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { FetchAnswersDataContextFlagment } from './providers/GetFetchAnswersDataContextProvider.tsx'
import { QuestionCounterContextFlagment } from './providers/QuestionCounterContextProvider.tsx'
import { QuizCollectAnswerScoresContextFlagment } from './providers/QuizCollectAnswerScoresContextProvider.tsx'
import { BtnDisabledContextFlagment } from './providers/BtnDisabledContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FetchAnswersDataContextFlagment>
      <QuestionCounterContextFlagment>
        <QuizCollectAnswerScoresContextFlagment>
          <BtnDisabledContextFlagment>
            <App />
          </BtnDisabledContextFlagment>
        </QuizCollectAnswerScoresContextFlagment>
      </QuestionCounterContextFlagment>
    </FetchAnswersDataContextFlagment>
  </StrictMode>,
)
