import { useEffect, useRef } from "react";
import { Form} from "react-router-dom";


export default function Comments({comments, postId, error}){
  
  const ref = useRef();
  useEffect(() => ref.current.reset());
  
  return(
    <>    
      <Form method='post' action={`/posts/${postId}`} ref={ref}>
        <h2>Leave a comment</h2>

        <label> 
          <span>Name:</span>
          <input 
            type='text'
            name='username'
            placeholder='Ginger'
            required={true}
          />
          {error ? <span className='input-error'>{error.username}</span> : ''}
        </label>

        <label> 
          <span>Comment:</span>
          <textarea 
            type='text'
            name='comment'
            placeholder='Great Post!'
            required= {true}
          ></textarea>
          {error ? <span className='input-error'>{error.comment}</span> : ''}
        </label>

        <button onClick={animateButton}>Submit</button>

      </Form>

      <h3 className='comment-btn grey'>comments</h3>
      {
        comments.length == 0 ? <p>No Comments on this post</p> :
        comments.map(comment => <Comment comment={comment} key={comment._id}/>)
      }
    </>
  );
}

function Comment({comment}){
  
  return(
    <div className="comment">
      <p className="name">
        <span className="material-symbols-outlined">account_circle</span>
        {comment.username}
      </p>
      <p className='comment-date'><i>{ comment.timeStamp ? new Date(comment.timeStamp).toDateString() :'Fri Aug 8th 2022'}</i></p>
      <p>{comment.comment}</p>
    </div>
  )
}

const animateButton = e => {
  e.target.classList.add('animateButton');
  setTimeout(() => e.target.classList.remove('animateButton'), 300);
};