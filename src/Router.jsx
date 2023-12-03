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
import MyNotifications from './pages/MyNotificationsPage/MyNotificationsPage';
import EventPage from './pages/EventPage/EventPage';
import NewEventPage from './pages/NewEventPage/NewEventPage'

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
                    path: 'events',
                    element: <MyEvents />
                },
                {
                    path: 'events/:id',
                    element: <EventPage />
                },
                {
                    path: 'new_event',
                    element: <NewEventPage />
                },
                {
                    path: 'my_notifications',
                    element: <MyNotifications />
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