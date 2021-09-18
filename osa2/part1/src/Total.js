const Total = (props) => {
  const parts = props.course.parts;
  return (
      <div>
        <p>Number of exercises { parts.map(p => p.exercises).reduce((a, b) => a + b) }</p>
      </div>
  );
};

export default Total;
