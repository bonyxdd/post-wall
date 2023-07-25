import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost'

const fetchPostsData = async () => {
  try {
    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');

    const postsData = postsResponse.data.map((post) => {
      const author = usersResponse.data.find((user) => user.id === post.userId);
      const comments = commentsResponse.data.filter((comment) => comment.postId === post.id);
      return {
        ...post,
        authorName: author.name,
        commentsCount: comments.length,
      };
    });

    return postsData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const postsData = await fetchPostsData();
      setPosts(postsData);
    };

    getPosts();
  }, []);
  return (
    <Router>
      <Routes>
        <Route exact path="/post-wall" element={<PostList posts={posts} />} />
        <Route path="/post/:postId" element={<SinglePost />} />
      </Routes>
    </Router>
  );
};

export default App;