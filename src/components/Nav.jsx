import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { googleLogOut, googleLogin, onUserState } from '../api/firebase';
import { useState } from 'react';
import UserData from './UserData';
import { LuPencil } from "react-icons/lu";
import MainMenu from './MainMenu';

function Nav() {
    const [user,setUser] = useState();
    const navigate = useNavigate();
    // console.log(user);

    const login=()=>{
        // googleLogin().then(setUser);
        navigate('/login'); //로그인 페이지로 이동하는 메서드로 변경
    }
    const logOut=()=>{
        googleLogOut().then(setUser);
    }

    useEffect(()=>{
        onUserState((user)=>{
            setUser(user);
        })
    },[])
    // console.log(user)

    return (
        <HeaderContainer>
            <h1><Link to='/'>shop</Link></h1>
            <Link to ='/board/qna'>qna</Link>
            <span className='mainWrapper'>
            <MainMenu/>
            </span>
            <div className='userWrap'>
                <Link to='/search'>검색</Link>
                {user&&user.isAdmin&&(
                    <Link to='/product/upload' className='uploadBtn'><LuPencil /></Link>
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
    background:#A0D468;
    color: black;
    display:flex;
    align-items:center;
    padding:12px;
    gap:24px;
    border-bottom:solid 1px rgba(0,0,0,0.1);
    position: relative;

    .mainWrapper{
        text-align:center;
        font-size:24px;
        font-weight:bold;
    }

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
        .uploadBtn{

        }
    }
`

export default Nav
