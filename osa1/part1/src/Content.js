import Part from './Part';

const Content = (props) => {
  return (
      <div>
        <Part part={props.part1.name} content={props.part1.exercises} />
        <Part part={props.part2.name} content={props.part2.exercises} />
        <Part part={props.part3.name} content={props.part3.exercises} />
      </div>
  );
};

export default Content;
