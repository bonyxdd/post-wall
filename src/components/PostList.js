import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';
const PostList = ({ posts }) => {
const defaultOptions = { reverse: true, max: 5, perspective: 1000, scale: 1, speed: 1000, transition: true, axis: null, reset: true, easing: "cubic-bezier(.03,.98,.52,.99)" }
    
    return (
      <div>
        <h1>Posts</h1>
        <ul>
            {posts.map((post) => (
            <Tilt className="tilt" options={defaultOptions}>
                <li key={post.id}>
                    <h2 id="title">{post.title}</h2>
                    <h3 id="author">{post.authorName}</h3>
                    <p id="body">{post.body.substring(0, 150) + '...'}</p>
                    <div className='botRow'>
                        <p><Link to={`/post/${post.id}`}>Read more...</Link></p>
                        <p><Link to={`/post/${post.id}`}>Comments: {post.commentsCount}</Link></p>
                    </div>
                </li>
            </Tilt>
          ))}
        </ul>
      </div>
    );
};

export default PostList;