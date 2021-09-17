const Part = (props) => {
  return (
      <div>
        <p>
          { props.part } { props.content }
        </p>
      </div>
  );
};

export default Part;
