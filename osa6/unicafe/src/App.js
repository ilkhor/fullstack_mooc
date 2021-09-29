import './App.css';
import Header from './components/Header';
import Statistics from './components/Statistics';
import Button from './components/Button';
import { useDispatch, useSelector } from 'react-redux';

import { createBadFeedback, createGoodFeedback, createNeutralFeedback } from './state/counterReducer';

function App () {

  const dispatch = useDispatch();
  const feedback = useSelector(state => state);

  const goodFeedback = () => dispatch(createGoodFeedback());
  const neutralFeedback = () => dispatch(createNeutralFeedback());
  const badFeedback = () => dispatch(createBadFeedback());

  return (
    <div>
      <Header heading="Give feedback"/>
      <Button text="good" handleClick={ goodFeedback }/>
      <Button text="neutral" handleClick={ neutralFeedback }/>
      <Button text="bad" handleClick={ badFeedback }/>
      <Statistics feedback={ feedback }/>
    </div>
  );
}

export default App;
