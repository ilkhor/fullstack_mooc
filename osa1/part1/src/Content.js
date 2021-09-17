import Part from './Part';

const Content = (props) => {
  return (
      <div>
        <Part part={props.parts[0].name} content={props.parts[0].exercises} />
        <Part part={props.parts[1].name} content={props.parts[1].exercises} />
        <Part part={props.parts[2].name} content={props.parts[2].exercises} />
      </div>
  );
};

export default Content;
