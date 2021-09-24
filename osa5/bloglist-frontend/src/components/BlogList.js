import Blog from './Blog';

const BlogList = ({blogs, likeBlog}) => {
  return (
      <div>
        <h2>Blogs</h2>
        {
          blogs.sort((a, b) => {
            if (a.likes > b.likes) return -1;
            else if (a.likes === b.likes) return 0;
            return 1;
          })
          .map(blog => <Blog key={ blog.id } blog={ blog } likeBlog={ likeBlog }/>)
        }
      </div>
  );
};

export default BlogList;
