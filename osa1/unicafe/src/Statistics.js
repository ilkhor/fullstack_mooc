import Header from './Header';

const Feedback = ({rating, value}) => (<p>{rating}: {value}</p>)

const Statistics = ({feedback}) => {

  const feedbackCount = () => feedback.good + feedback.neutral + feedback.bad;
  const average = () => {
    const value = feedback.good-feedback.bad;
    if ( value === 0) return 0;

    return (feedback.good-feedback.bad) / feedbackCount();
  }

  const positive = () => {
    if (feedback.good === 0) return '0 %';
    const val = feedback.good / feedbackCount() * 100;
    return val + ' %';
  }

  return (
      <diV>
        <Header heading="Statistics"/>
        <Feedback rating='good' value={feedback.good} />
        <Feedback rating='neutral' value={feedback.neutral} />
        <Feedback rating='bad' value={feedback.bad} />
        <Feedback rating='total' value={feedbackCount()} />
        <Feedback rating='average' value={average()} />
        <Feedback rating='positive' value={positive()} />
      </diV>
  );
};

export default Statistics;
