import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';

import Layout from './pages/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import InstructionPage from './pages/InstructionPage/InstructionPage';
import MainPage from './pages/MainPage/MainPage';
import DataEntry from './pages/DataEntry/DataEntry';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MyEvents from './pages/MyEventsPage/MyEventsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <LandingPage />
                },
                {
                    path: 'main',
                    element: <MainPage />
                },
                {
                    path: 'instructions',
                    element: <InstructionPage />
                },
                {
                    path: 'entrydata',
                    element: <DataEntry />
                },
                {
                    path: 'profile',
                    element: <ProfilePage />
                },
                {
                    path: 'my_events',
                    element: <MyEvents />
                },
                {
                    path: 'login',
                    element: <LoginPage />
                },
                {
                    path: 'register',
                    element: <RegisterPage />
                }
            ]
        }, 
        {
            path: '*',
            loader: () => {
                return redirect('/')
            }
        }
    ])

    return (
        <RouterProvider router={router} />
    );
}

export default Router;