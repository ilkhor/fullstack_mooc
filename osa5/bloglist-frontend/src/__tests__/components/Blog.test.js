import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../../components/Blog';
import { fireEvent, render } from '@testing-library/react';

describe('Blog tests', () => {
  const blog = {
    'user': 'Ilkka',
    'title': 'Title',
    'author': 'Author',
    'url': 'http://url.com',
    'id': 5,
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

});
