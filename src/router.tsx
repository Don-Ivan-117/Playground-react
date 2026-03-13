import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import App from './App'
import Layout from './layouts/Layout'
import {Counter, Todo, Filter, Cart} from '../src/pages'


export default function AppRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path='/' element={<App/>} index></Route>
                    <Route path='/counter' element={<Counter/>}></Route>
                    <Route path='/todo' element={<Todo/>}></Route>
                    <Route path='/filter' element={<Filter/>}></Route>
                    <Route path='/cart' element={<Cart/>}></Route>
                    <Route path='*' element={<Navigate to="/" replace/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
        
    )
}