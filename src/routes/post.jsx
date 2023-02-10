import { Suspense } from 'react';
import { Await, defer, redirect, useActionData, useLoaderData} from 'react-router-dom';
import imageUrl1 from '../images/image1.jpg';
import Comment from './comments';

async function getPost(postId){
  let response = await fetch(`https://blog-api-vasl.onrender.com/api/posts/${postId}`);
  response = await response.json();
  return response.post;
}

async function getPostComments(postId){
  let response = await fetch(`https://blog-api-vasl.onrender.com/api/posts/${postId}/comments`);
  response = await response.json();
  return response.comments;
}

export async function loader({ params }){;
  let post = getPost(params.postId);
  let comments = getPostComments(params.postId);
  return defer({post, comments})
}

export async function action ({request, params}){
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
    
  const response = await fetch(`https://blog-api-vasl.onrender.com/api/posts/${params.postId}/comments`,{
    method: 'POST',
    headers: {'Content-Type' : 'application/json; charset=UTF-8'},
    body: JSON.stringify(userData)
  })

  const data = await response.json();
  return data.error;
}

export default function Post(){
  
  const {post, comments} = useLoaderData();
  const error = useActionData();
  window.scroll({ top: 0,behavior: 'smooth' });

  return(
    <div className='post'>
    <Suspense fallback={<SkeletonPost />}>
{/* error in comment */}
      <Await resolve={post}>
       {(resolvedPost) => 
        <>
          <h1>{resolvedPost.title}</h1>
          <div className='postMetaData'>
            <span>{resolvedPost.category || 'Business'}</span>
            <span className='createdAt light'><i>Posted on: {resolvedPost.date ? new Date(resolvedPost.date).toDateString() : 'Fri august 8th 2022'}</i></span>
          </div>
          <img src={resolvedPost.img || imageUrl1} />
          <p className='about'>"{resolvedPost.about}"</p>
          <p>{resolvedPost.content}</p>

          <Suspense fallback={<SkeletonComments />}>
            <Await resolve={comments}>
              {(resolvedComments) => <Comment comments={resolvedComments} postId={resolvedPost._id} error={error} />}
            </Await>
          </Suspense>
        </>
       } 
      </Await>
    </Suspense>

    </div>
  )
}

export function SkeletonPost(){
  return(
    <div className='post'>
      <h1 className='skeleton-post-title'></h1>
      <div className='skeleton-post-info'>
        <span className='skeleton-post-category'></span>
        <span className='skeleton-post-date'></span>
      </div>
      <div className='skeleton-post-image'></div>
      <div className='skeleton-post-about'></div>
      <div className='skeleton-post-content'>
      </div>
    </div>
  )
}

export function SkeletonComments(){
  return(
    <>
      <div className='comment'>
        <div className='skeleton-comment-header'>
          <div className='skeleton-user-account'></div>
          <div className='skeleton-user-name'></div>
        </div>
        <div className='skeleton-comment-date'></div>
        <div className='skeleton-comment-content'></div>
      </div>

      <div className='comment'>
        <div className='skeleton-comment-header'>
          <div className='skeleton-user-account'></div>
          <div className='skeleton-user-name'></div>
        </div>
        <div className='skeleton-comment-date'></div>
        <div className='skeleton-comment-content'></div>
      </div>

      <div className='comment'>
        <div className='skeleton-comment-header'>
          <div className='skeleton-user-account'></div>
          <div className='skeleton-user-name'></div>
        </div>
        <div className='skeleton-comment-date'></div>
        <div className='skeleton-comment-content'></div>
      </div>
    </>
  )
}