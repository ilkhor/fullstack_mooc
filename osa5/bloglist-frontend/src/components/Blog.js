import React, { useState } from 'react';

const Blog = ({blog, likeBlog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [state, setState] = useState('small');

  const btnTxt = () => ( state === 'small' ? 'Näytä' : 'Piilota' );

  const smallVisibility = () => ( {display: state === 'small' ? '' : 'none'} );
  const bigVisibility = () => ( {display: state === 'big' ? '' : 'none'} );

  const onClick = () => {
    if (state === 'small') setState('big');
    else setState('small');
  };

  const onLikeClick = () => {
    likeBlog(blog.id);
  };

  const likes = () => {
    if (blog.likes === undefined) return 0;
    return blog.likes;
  };

  return (
      <div style={ blogStyle }>
        <div style={ smallVisibility() }>
          <p>{ blog.title }</p>
        </div>
        <div style={ bigVisibility() }>
          <p>{ blog.title }</p>
          <p>{ blog.url }</p>
          <div>Likes { likes() }
            <button onClick={ onLikeClick }>Like</button>
          </div>
          <p>{ blog.author }</p>
        </div>
        <button onClick={ onClick }>{ btnTxt() }</button>
      </div>
  );

};

export default Blog;
