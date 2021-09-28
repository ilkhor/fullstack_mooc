import React, { useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Toggle = React.forwardRef((props, ref) => {

  const [visibility, setVisibility] = useState(props.initialVisibility);

  const childVisible = () => ( { display: visibility ? '' : 'none' } );
  const buttonVisible = () => ( { display: visibility ? 'none' : '' } );

  useImperativeHandle(ref, () => {
    return {
      setVisibility
    };
  });

  return (
    <div>
      <div style={ childVisible() }>
        { props.children }
      </div>
      <div>
        <button id='first' style={ buttonVisible() }
          onClick={ () => setVisibility(true) }>{ props.showTxt }</button>
        <button id='second' style={ childVisible() }
          onClick={ () => setVisibility(false) }>{ props.hideTxt }</button>
      </div>
    </div> );

});

Toggle.prototypes = {
  initialVisibility: PropTypes.bool.isRequired,
  showTxt: PropTypes.string.isRequired,
  hideTxt: PropTypes.string.isRequired
};

export default Toggle;
