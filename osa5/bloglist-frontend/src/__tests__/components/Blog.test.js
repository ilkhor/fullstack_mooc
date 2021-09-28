import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../../components/Blog';
import { fireEvent, render } from '@testing-library/react';
import BlogForm from '../../components/BlogForm';
import { v4 as uuidv4 } from 'uuid';

describe('Blog tests', () => {

  const blog = {
    'user': 'Ilkka',
    'title': 'Title',
    'author': 'Author',
    'url': 'http://url.com',
    'id': uuidv4(),
    'likes': 1
  };

  test('Renders correctly when small', () => {

    const likeBlog = jest.fn();
    const deleteBlog = jest.fn();

    const component = render(
      <Blog blog={ blog } likeBlog={ likeBlog } deleteBlog={ deleteBlog }/>
    );

    const small = component.container.querySelector('#small');
    const big = component.container.querySelector('#big');
    expect(small).toBeVisible();
    expect(big).not.toBeVisible();
    expect(small).toHaveTextContent(blog.title);
    expect(small).not.toHaveTextContent(blog.author);
    expect(small).not.toHaveTextContent(blog.url);
  });

  test('Renders correctly when big', () => {

    const likeBlog = jest.fn();
    const deleteBlog = jest.fn();

    const component = render(
      <Blog blog={ blog } likeBlog={ likeBlog } deleteBlog={ deleteBlog }/>
    );

    const small = component.container.querySelector('#small');
    const big = component.container.querySelector('#big');
    const toggleBtn = component.container.querySelector('#toggle');

    fireEvent.click(toggleBtn);

    expect(small).not.toBeVisible();
    expect(big).toBeVisible();
    expect(big).toHaveTextContent(blog.title);
    expect(big).toHaveTextContent(blog.author);
    expect(big).toHaveTextContent(blog.url);
  });

  test('add likes called correctly', () => {

    const likeBlog = jest.fn();
    const deleteBlog = jest.fn();

    const component = render(
      <Blog blog={ blog } likeBlog={ likeBlog } deleteBlog={ deleteBlog }/>
    );

    const toggleBtn = component.container.querySelector('#toggle');
    const likeBtn = component.container.querySelector(`#likeBtn.${blog.id}`);

    fireEvent.click(toggleBtn);
    fireEvent.click(likeBtn);
    fireEvent.click(likeBtn);

    expect(likeBlog).toHaveBeenCalledTimes(2);
  });

  test('Blog created with correct values', () => {

    const handleSubmit = jest.fn();

    const component = render(
      <BlogForm handleSubmit={ handleSubmit }/>);

    const title = component.container.querySelector('#title_text');
    const author = component.container.querySelector('#author_text');
    const url = component.container.querySelector('#url_text');
    const form = component.container.querySelector('form');

    fireEvent.change(title, { target: { value: blog.title } });
    fireEvent.change(author, { target: { value: blog.author } });
    fireEvent.change(url, { target: { value: blog.url } });
    fireEvent.submit(form);

    expect(handleSubmit).toBeCalledWith({
      title: blog.title, author: blog.author, url: blog.url
    });

  });

});
