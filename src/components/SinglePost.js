import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Tilt } from 'react-tilt';
const defaultOptions = {reverse:true,max:5,perspective:1000,scale:1,speed:1000,transition:true,axis:null,reset:true,easing:"cubic-bezier(.03,.98,.52,.99)"}

const SinglePost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      const getPost = async () => {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
          const userId = response.data.userId;
          const usersResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
          const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
          
          const postData = response.data;
          const author = usersResponse.data;
          const commentsData = commentsResponse.data;
  
  
          const postWithAuthorName = {
            ...postData,
            authorName: author.name,
            commentsCount: commentsData.length,
          };
  
          setPost(postWithAuthorName);
          setComments(commentsData);
        } catch (error) {
          console.error(error);
        }
      };
  
      getPost();
    }, [postId]);
  
    if (!post) {
      return (
        <div className='loadingWrap'>
          <h1 className='loading'>Loading the post...</h1>
        </div>
      )
    }
    return (
    <div>
        <Link className="back" to="/post-wall"><h1>See All Posts</h1></Link>
        <div className='postWrap'>
            <h2 id="title">{post.title}</h2>
            <h3 id="author">{post.authorName}</h3>
            <p id="body">{post.body}</p>
        </div>
        <h3>{post.commentsCount} Comments:</h3>           
        <ul>
          {comments.map((comment) => (
           <Tilt className="tilt" options={defaultOptions}>
              <li key={comment.id}>
                <h3>{comment.name}</h3>
                <h5>{comment.email}</h5>
                <p>{comment.body}</p>
              </li>                
            </Tilt>
          ))}
        </ul>
      </div>
    );
};
  
export default SinglePost;