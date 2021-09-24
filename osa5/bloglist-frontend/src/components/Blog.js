import React, { useState } from 'react';
import userService from '../services/user'

const Blog = ({blog, likeBlog, deleteBlog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const user = userService.fetchUserLocally();
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

  const deleteBtnVisibility = () => {

    console.log(blog.user, user.name);
    if (user === null || user.name !== blog.user) {
      return {display: 'none'};
    }
    return {display: ''};
  };

  const onDelete = () => {
    deleteBlog(blog.id);
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
          <div  style={deleteBtnVisibility()}>
            <button onClick={ onDelete }>Poista</button>
          </div>
        </div>
        <button onClick={ onClick }>{ btnTxt() }</button>
      </div>
  );

};

export default Blog;
