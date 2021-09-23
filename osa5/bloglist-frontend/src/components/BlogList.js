import Blog from './Blog';

const BlogList = ({blogs, likeBlog}) => {
  return (
      <div>
        <h2>Blogs</h2>
        {
          blogs.map(blog => <Blog key={ blog.id } blog={ blog } likeBlog={likeBlog}/>)
        }
      </div>
  );
};

export default BlogList;
