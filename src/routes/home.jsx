import girlImageUrl from '../images/girl2.jpg';
import Card from './card';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

async function getPosts(){
  const response = await fetch('https://blog-api-vasl.onrender.com/api/posts');
  const data = await response.json();
  return data.posts;
}

export async function loader(){
  let posts = getPosts();
  return defer({posts});
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
        <Suspense fallback={<SkeletonHomePage />}>
          <Await resolve={posts}>
            {(resolvedPost) => <>
              {
                resolvedPost.length == 0 ? <p className='no-posts'>There are no posts</p>: 
                resolvedPost.map(post => <Card post={post} key={post._id}/>)
              }
            </>}
        
          </Await>
        </Suspense>
      </div>  
    </main>
    </>
  )
}

export function SkeletonHomePage(){
  return(
    <div className='test-container'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

function SkeletonCard(){
  return(
    <div className='card'>
        <div className='skeleton-image'></div>
        <div className='info'>
          <p><span className='skeleton-date'></span> <span className='skeleton-category'></span></p>
          <h2 className='skeleton-title'></h2>
          <p className='skeleton-about'></p>
          <p className='skeleton-link'></p>
        </div>
      </div>
  )
}