import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedRoute from '../component/ProtectedRoute/ProtectedRoute';
import Profile from '../pages/Profile/Profile';
import Problems from '../pages/Problems/Problems';
import Notes from '../pages/Notes/Notes';
import Goals from '../pages/Goals/Goals';
import DashboardLayout from '../Layouts/DashboardLayout';
import AddProblem from '../pages/Problems/AddProblem';
import EditProblem from '../pages/Problems/EditProblem';
import AddNote from '../pages/Notes/AddNote';
import NoteEditor from '../pages/Notes/NoteEditor';
import EditProfile from '../pages/Profile/EditProfile';
import AddGoal from '../pages/Goals/AddGoal';
import EditGoal from '../pages/Goals/EditGoal';

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>} />

                <Route element={<ProtectedRoute/>}>
                    <Route path='/dashboard' element={<DashboardLayout> <Dashboard/> </DashboardLayout>}/>
                    <Route path='/profile' element={<DashboardLayout> <Profile/> </DashboardLayout>}/>
                    <Route path='/problems' element={<DashboardLayout> <Problems/> </DashboardLayout>} />
                    <Route path='/notes' element={<DashboardLayout> <Notes/> </DashboardLayout>} />
                    <Route path='/goals' element={<DashboardLayout> <Goals/> </DashboardLayout>} />
                    <Route path='/add-problem' element={<AddProblem/>}/>
                    <Route path='/edit-problem/:id' element={<EditProblem/>}/>
                    <Route path='/add-note' element={<AddNote/>}/>
                    <Route path='/edit-note/:id' element={<NoteEditor/>}/>
                    <Route path='/edit-profile/:id' element={<EditProfile/>}/>
                    <Route path='/add-goal' element={<AddGoal/>}/>
                    <Route path='/edit-goal' element={<EditGoal/>}/>

                </Route>
                <Route path='*' element={<Navigate to='/login' replace />}/>
            </Routes>

        </div>
    )
}

export default AppRoutes
