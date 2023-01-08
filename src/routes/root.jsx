
import { Link, Outlet } from 'react-router-dom';
import Footer from './footer';
export default function Root(){
return(
  <>
    <nav><Link to='/'>Tanishka's Blog</Link></nav>
    <Outlet />
    <Footer />
  </>
  );
};
