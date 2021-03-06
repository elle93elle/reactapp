import React, {useContext, useEffect, useState} from 'react';
import {users} from "../database/users";
import {AppContext} from "../App";
import MyInput from "../UI/Input/MyInput";
import FormCard from "../UI/FormCard/FormCard";
import MyButton from "../UI/buttons/MyButton";
import '../styles/Private.css'


const Private = () => {
    const {isAuth, setIsAuth, tours} = useContext(AppContext)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [orders, setOrders] = useState([])
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        const getOrders = JSON.parse(localStorage.getItem('orders'))
        setOrders(getOrders)
    }, [])


    async function submitUser(e) {
        e.preventDefault()
        setUsersList(users)
        const currentUser = usersList.find((item) => item.login === login)
        if (!currentUser) {
            return alert('No such user')
        }

        if (currentUser.password !== password) {
            return alert('Password is not correct')
        }

        alert('You are logged')
        setPassword('')
        setLogin('')
        setIsAuth(true)
    }


    if (!isAuth) {
        return (
            <div className='private'>
                <FormCard>
                    <form onSubmit={submitUser}>
                        <h1 style={{textAlign:'center'}}>Enter your login and password</h1>
                        <MyInput
                            required
                            type="text"
                            placeholder='login'
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}/>
                        <MyInput
                            required
                            type="password"
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <MyButton type='submit'>LOG IN</MyButton>
                    </form>
                </FormCard>
            </div>
        )
    }

    if (!orders.length) {
        return (
            <h3 className='tours__title'>No orders</h3>
        )
    }


    return (
        <div className='private-info'>
        <table className='private-info__table'>
            <tr>
            <th>
                Name
            </th>
            <th>
                Phone number
            </th>
            <th>ID</th>
        </tr>
            {orders.map((order) => {
                return (
                    <tr>
                        <td>{order.name}</td>
                        <td>{order.phone}</td>
                        <td>{order.id}</td>
                    </tr>
                )
            })}
        </table>
        </div>
    )
};

export default Private;