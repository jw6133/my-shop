import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function BoardListItem({post}) {
    const navigate = useNavigate();
    console.log(post)
    const onDetailEvent=()=>{
        navigate(`/board/qna/${post.id}`,{
            state : {
                id:post.id,
                user:post.user,
                date:post.date,
                title:post.title,
                text:post.text
            }
        });
    }
    return (
        <BoardItem onClick={onDetailEvent}>
            <p>
                {post.title}
                {post.date}
            </p>
        </BoardItem>
    )
}

export default BoardListItem

const BoardItem = styled.li`
    
`