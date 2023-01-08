import girlImageUrl from '../images/girl2.jpg';
import Card from './card';
import { useLoaderData } from 'react-router-dom';

export async function loader(){
  const response = await fetch('https://blog-api-vasl.onrender.com/api/posts');
  const data = await response.json();
  return {posts: data.posts};
}

export default function Posts(){
  const {posts} = useLoaderData();
  return(
    <>
    <div className='hero'>
      <img className='hero-image' src={girlImageUrl}/>
      <div className='hero-about'>
        <h1>Hi,<br />I am Tanishka Talwar.</h1>
        <p className='light'><i>Welcome to my blog.<br/>I am a self-taught fullstack developer, nature and animal lover, and wishes to travel the world.</i></p>
      </div>
    </div>
    <main>
      <h1 className='cards-heading'>Posts</h1>
      <div className='cards-container'>
        {posts.length == 0 ? <p className='no-posts'>There are no posts</p>: 
        posts.map(post => <Card post={post} key={post._id}/>)}
      </div>  
    </main>
    </>
  )
}
