import { RouterProvider } from 'react-router-dom';
import './App.scss';
import router from './router/router';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} >
      </RouterProvider>
    </UserProvider>
  );
}

export default App;
