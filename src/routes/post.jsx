import { redirect, useActionData, useLoaderData} from 'react-router-dom';
import imageUrl1 from '../images/image1.jpg';
import Comment from './comments';

export async function loader({ params }){
  const response1 = await fetch(`http://localhost:3000/api/posts/${params.postId}`);
  const response2 = await fetch(`http://localhost:3000/api/posts/${params.postId}/comments`);
  const data1 = await response1.json();
  const data2 = await response2.json();
  
  if(!data1.post) throw new Error('No post found with this id');
  return {post: data1.post, comments: data2.comments};
}

export async function action ({request, params}){
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
    
  const response = await fetch(`http://localhost:3000/api/posts/${params.postId}/comments`,{
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

  return(
    <div className='post'>
      <h1>{post.title }</h1>
      <div className='postMetaData'>
        <span>{post.category || 'Business'}</span>
        <span className='createdAt light'><i>Posted on: {post.date ? new Date(post.date).toDateString() : 'Fri august 8th 2022'}</i></span>
      </div>
      <img src={post.img || imageUrl1}/>
      <p className='about'>"{post.about}"</p>
      <p>{post.content}</p>

      <Comment comments={comments} postId={post._id} error={error}/>
    </div>
  )
}