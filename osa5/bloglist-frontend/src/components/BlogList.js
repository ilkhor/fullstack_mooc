import Blog from './Blog';
import PropTypes from 'prop-types';

const BlogList = ({blogs, likeBlog, deleteBlog}) => {
  return (
      <div>
        <h2>Blogs</h2>
        {
          blogs.sort((a, b) => {
            if (a.likes > b.likes) return -1;
            else if (a.likes === b.likes) return 0;
            return 1;
          })
          .map(blog => <Blog key={ blog.id } blog={ blog } likeBlog={ likeBlog } deleteBlog={ deleteBlog }/>)
        }
      </div>
  );
};

BlogList.prototypes = {
  blogs: PropTypes.object,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default BlogList;
