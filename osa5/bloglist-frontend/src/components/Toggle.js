import React, { useImperativeHandle, useState } from 'react';

const Toggle = React.forwardRef((props, ref) => {

  const [visibility, setVisibility] = useState(props.initialVisibility);

  const childVisible = () => ( {display: visibility ? '' : 'none'} );
  const buttonVisible = () => ( {display: visibility ? 'none' : ''} );

  useImperativeHandle(ref, () => {
    return {
      setVisibility,
    };
  });

  return (
      <div>
        <div style={ childVisible() }>
          { props.children }
        </div>
        <div>
          <button style={ buttonVisible() }
                  onClick={ () => setVisibility(true) }>{ props.showTxt }</button>
          <button style={ childVisible() }
                  onClick={ () => setVisibility(false) }>{ props.hideTxt }</button>
        </div>
      </div> );

});

export default Toggle;
