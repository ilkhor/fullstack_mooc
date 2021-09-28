import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ handleSubmit }) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const submit = (e) => {
    e.preventDefault();

    handleSubmit({
      title, author, url
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={ submit }>
        <div><label id="title">Title: </label>
          <input id='title_text' value={ title }
            onChange={ (e) => setTitle(e.target.value) }/>

        </div>
        <div>
          <label id="author">Author: </label>
          <input id='author_text' type="text" value={ author }
            onChange={ (e) => setAuthor(e.target.value) }/>
        </div>
        <div>
          <label id="url">Url: </label>
          <input id='url_text' type="text" value={ url }
            onChange={ (e) => setUrl(e.target.value) }/>
        </div>
        <button id="create_blog" type="submit">Tallenna</button>
      </form>

    </div>
  );

};

BlogForm.prototypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default BlogForm;
