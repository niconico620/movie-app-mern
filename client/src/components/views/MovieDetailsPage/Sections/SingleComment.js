import React, {useState} from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import {useSelector} from 'react-redux';
import axios from 'axios';
import LikeDislikes from './LikeDislikes';
const {TextArea} = Input;


function SingleComment(props) {

    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)


    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log("lol")
                    console.log(response.data.result);
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply}style={{ color: '#d4b106', fontFamily: 'Roboto, Helvetica' }} key="comment-basic-reply-to">Reply</span>
    ]
    return (
        <div>
            <Comment
                style={{  width: '70%', height: '10%' }}
                actions={actions}
                author={<span style={{ color: '#d4b106' }}>{props.comment.writer.name}</span>}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="Image"
                    />
                }
                content={
                    <p style={{ color: 'white' }}>
                        {props.comment.content}
                    </p>
                }
            ></Comment>
           

            {OpenReply && <form style={{ display: 'flex' }}  onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '40%', borderRadius: '5px', marginLeft: '10px' }}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="Reply to this comment"
                />
                <br />
                <Button type="primary" style={{ width: '10%', height: '52px' }}  onClick={onSubmit}>Submit</Button>
            </form> }   

        </div>
    )
}

export default SingleComment
