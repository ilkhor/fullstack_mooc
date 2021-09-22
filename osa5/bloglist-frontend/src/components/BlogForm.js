import { useState } from 'react';

const BlogForm = ({handleSubmit}) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const submit = (e) => {
    e.preventDefault();

    handleSubmit({
      title, author, url,
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
            <input type="text" value={ title }
                   onChange={ (e) => setTitle(e.target.value) }/>

          </div>
          <div>
            <label id="author">Author: </label>
            <input type="text" value={ author }
                   onChange={ (e) => setAuthor(e.target.value) }/>
          </div>
          <div>
            <label id="url">Url: </label>
            <input type="text" value={ url }
                   onChange={ (e) => setUrl(e.target.value) }/>
          </div>
          <button type="submit">Tallenna</button>
        </form>

      </div>
  );

};

export default BlogForm;
