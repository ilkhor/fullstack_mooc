import Header from './Header';

const Feedback = ({rating, value}) => (<p>{rating}: {value}</p>)

const Statistics = ({feedback}) => {
  return (
      <diV>
        <Header heading="Statistics"/>
        <Feedback rating='good' value={feedback.good} />
        <Feedback rating='neutral' value={feedback.neutral} />
        <Feedback rating='bad' value={feedback.bad} />
      </diV>
  );
};

export default Statistics;
