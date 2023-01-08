import imageUrl4 from '../images/image4.jpg';
import { Link } from 'react-router-dom';

export default function Card({ post }){

  return(
    <div className='card' key={post._id}>
      <div className='image'><img src={post.img || imageUrl4}/></div>
      <div className='info'>
        <p className='light'><span>Fri august 8th 2022</span> | <span>{post.category}</span></p>
        <h2>{post.title}</h2>
        <p><i>{post.about}</i></p>
        <i><Link to={`/posts/${post._id}/`}>read more</Link></i>
      </div>
    </div>
  );
}