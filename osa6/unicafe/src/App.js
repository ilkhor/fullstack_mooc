import './App.css';
import counterReducer from './state/counterReducer';
import Header from './components/Header';
import Statistics from './components/Statistics';
import Button from './components/Button';
import { createStore } from 'redux';

function App () {

  const store = createStore(counterReducer);

  const goodFeedback = () => store.dispatch({ type: 'GOOD' });
  const neutralFeedback = () => store.dispatch({ type: 'OK' });
  const badFeedback = () => store.dispatch({ type: 'BAD' });

  goodFeedback();
  goodFeedback();
  goodFeedback();
  goodFeedback();
  neutralFeedback();
  neutralFeedback();
  neutralFeedback();
  neutralFeedback();

  return (
    <div>
      <Header heading="Give feedback"/>
      <Button text="good" handleClick={ goodFeedback }/>
      <Button text="neutral" handleClick={ neutralFeedback }/>
      <Button text="bad" handleClick={ badFeedback }/>
      <Statistics feedback={ store.getState() }/>
    </div>
  );
}

export default App;
