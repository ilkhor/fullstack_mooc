import Part from './Part';

const Content = (props) => {
  return (
      <div>
        <Part part={props.part1} content={props.exercises1} />
        <Part part={props.part2} content={props.exercises2} />
        <Part part={props.part3} content={props.exercises3} />
      </div>
  );
};

export default Content;
