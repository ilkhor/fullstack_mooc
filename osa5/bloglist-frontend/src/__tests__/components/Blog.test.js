import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../../components/Blog';
import { render } from '@testing-library/react';

describe('Blog tests', () => {
  test('Renders correctly when small', () => {

    const blog = {
      'user': 'Ilkka',
      'title': 'Title',
      'author': 'Author',
      'url': 'http://url.com',
      'id': 5,
      'likes': 1
    };

    const likeBlog = jest.fn();
    const deleteBlog = jest.fn();

    const component = render(
      <Blog blog={ blog } likeBlog={ likeBlog } deleteBlog={ deleteBlog }/>
    );

    const small = component.container.querySelector('#small');
    expect(small).toBeVisible();
    expect(small).toHaveTextContent(blog.title);
    expect(small).not.toHaveTextContent(blog.author);
    expect(small).not.toHaveTextContent(blog.url);
  });
});
