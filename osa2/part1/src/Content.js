import Part from './Part';

const Content = ({course}) => {
  return (
      <div>
        <ul>{

          course.parts.map(part => {
            return ( <li id={ part.id }>
              <Part part={ part.name } content={ part.exercises }/>
            </li> );
          })
        }
        </ul>
      </div>
  );
};

export default Content;
