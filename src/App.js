
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes/Routes';
import { useDispatch } from 'react-redux';
import { getMe } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch()
  dispatch(getMe())
  return (
    <div className='max-w-[1440px] mx-auto'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
