import './App.css';
import Header from './components/Header';
import Statistics from './components/Statistics';
import { useState } from 'react';
import Button from './components/Button';

function App() {

  const [feedback, updateFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const goodFeedback = () => updateFeedback({...feedback, good: feedback.good + 1});
  const neutralFeedback = () => updateFeedback({...feedback, neutral: feedback.neutral + 1});
  const badFeedback = () => updateFeedback({...feedback, bad: feedback.bad + 1});

  return (
    <div>
      <Header heading='Give feedback' />
      <Button text='good' handleClick={goodFeedback} />
      <Button text='neutral' handleClick={neutralFeedback} />
      <Button text='bad' handleClick={badFeedback} />
      <Statistics feedback={feedback} />
    </div>
  );
}

export default App;
