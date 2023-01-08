import { useRouteError } from 'react-router-dom';
import errorImage from '../images/error.jpg';

export default function ErrorPage(){
  const error = useRouteError();
  return(
    <div className="error">
      <h1>Oops!</h1>
      <span className="material-symbols-outlined">sentiment_dissatisfied</span>
      <p>You crashed my blog website!</p>
      <i>{error.message}</i>
      <img src={errorImage}/>
    </div>
  )
}