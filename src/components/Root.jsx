import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

const Root = () => {
    return (
    <div className='bg-[rgb(5,8,22)]'>
      <Navbar />
     
      <div className='pt-28'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;