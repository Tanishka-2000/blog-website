import { useEffect, useRef } from "react";
import { Form} from "react-router-dom";


export default function Comments({comments, postId, error}){

  const ref = useRef();
  useEffect(() => ref.current.reset());
  
  return(
    <>    
      <Form className='comment-form' method='post' action={`/posts/${postId}`} ref={ref}>
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

      <h2 className='grey'>Comments</h2>
      {
        comments.length == 0 ? <p>No Comments on this post</p> :
        <div className='comments'>
         {comments.map(comment => <Comment comment={comment} key={comment._id}/>)}
        </div>
      }
    </>
  );
}

function Comment({comment}){
  
  return(
    <div className="comment">
      <div className="name">
        <span className="material-symbols-outlined">account_circle</span>
        <div>
          <span>{comment.username}</span>
          <span className='comment-date'><i>{ comment.timeStamp ? new Date(comment.timeStamp).toDateString() :'Fri Aug 8th 2022'}</i></span>
        </div>
      </div>
      <p className="msg">{comment.comment}</p>
    </div>
  )
}

const animateButton = e => {
  e.target.classList.add('animateButton');
  setTimeout(() => e.target.classList.remove('animateButton'), 300);
};