import Header from './Header';

const StatisticsLine = ({rating, value}) => ( <tr>
  <td>{ rating }:</td>
  <td>{ value }</td>
</tr> );

const Statistics = ({feedback}) => {

  const feedbackCount = () => feedback.good + feedback.neutral + feedback.bad;
  const average = () => {
    const value = feedback.good - feedback.bad;
    if (value === 0) return 0;

    return ( feedback.good - feedback.bad ) / feedbackCount();
  };

  const positive = () => {
    if (feedback.good === 0) return '0 %';
    const val = feedback.good / feedbackCount() * 100;
    return val + ' %';
  };

  if (feedbackCount() === 0) {
    return (
        <div>
          <Header heading="Statistics"/>
          <p>No feedback given</p>
        </div> );
  }

  return (

      <div>
        <Header heading="Statistics"/>
        <table>
          <thead>
          <tr>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
            <StatisticsLine rating="good" value={ feedback.good }/>
            <StatisticsLine rating="neutral" value={ feedback.neutral }/>
            <StatisticsLine rating="bad" value={ feedback.bad }/>
            <StatisticsLine rating="total" value={ feedbackCount() }/>
            <StatisticsLine rating="average" value={ average() }/>
            <StatisticsLine rating="positive" value={ positive() }/>
          </tbody>
        </table>
      </div>
  );
};

export default Statistics;
