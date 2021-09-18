import React, { useState } from 'react';


const Button = ({text, handleClick}) => {
  return (
      <div>
        <button onClick={ handleClick }>{ text }</button>
      </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
  ];

  const raffleAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteAnecdote = () => {
    const currentVotes = [...votes];
    currentVotes[selected] = currentVotes[selected] + 1;
    console.log(currentVotes);
    setVotes(currentVotes);
  }

  const mostPopularAnecdote = () => {
    return votes.indexOf(Math.max(...votes));
  }

  const initialVotes = Array(anecdotes.length).fill(0);
  console.log(initialVotes);
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);

  return (
      <div>
        <h1>Anecdote of the day</h1>
        { anecdotes[selected] }
        <p>has { votes[selected]} votes</p>
        <Button handleClick={ raffleAnecdote } text="next anecdote"/>
        <Button handleClick={ voteAnecdote } text="Vote"/>
        <h1>Anecdote with most votes</h1>
        <p>{ anecdotes[mostPopularAnecdote()]}</p>
        <p>has { votes[mostPopularAnecdote()]} votes</p>
      </div>
  );
};

export default App;
