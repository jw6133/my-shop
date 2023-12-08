import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { googleLogOut, googleLogin, onUserState } from '../api/firebase';
import { useState } from 'react';
import UserData from './UserData';

function Nav() {
    const [user,setUser] = useState();
    // console.log(user);

    const login=()=>{
        googleLogin().then(setUser);
    }
    const logOut=()=>{
        googleLogOut().then(setUser);
    }

    useEffect(()=>{
        onUserState((user)=>{
            setUser(user);
        })
    },[])
    console.log(user)

    return (
        <HeaderContainer>
            <h1><Link to='/'>shop</Link></h1>

            <div className='userWrap'>
                {user&&user.isAdmin&&(
                    <Link to='/product/upload'>업로드</Link>
                )}
                {user?(
                    <>
                        <UserData user={user}/>
                        <button className='logOutBtn' onClick={logOut}>logout</button>
                    </>):(
                        <button className='loginBtn' onClick={login}>login</button>
                    )
                }
                {/* {user&& <UserData user={user}/>}
                {!user&&<button className='loginBtn' onClick={login}>login</button>}
                {user&&<button className='logOutBtn' onClick={logOut}>logout</button>} */}
            </div>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    display:flex;
    align-items:center;
    padding:12px;
    gap:24px;

    .userWrap{
        display:flex;
        margin-left:auto;
        align-items:center;
        gap:12px;
        button{
            padding:6px 12px;
            border-radius:6px;
            &.loginBtn{
                background:pink
            }
        }
    }
`

export default Nav