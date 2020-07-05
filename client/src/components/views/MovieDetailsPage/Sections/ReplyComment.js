import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {

        let commentNumber = 0;
        props.CommentLists.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.CommentLists, props.parentCommentId])

    let renderReplyComment = (parentCommentId) =>
        props.CommentLists.map((comment, index) => (

            <React.Fragment key={index}>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <br />
                    </div>
                }




            </React.Fragment>
        )
        )


    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <a style={{ fontSize: '14px', margin: '10px', marginTop: '5px', color: 'rgb(160, 132, 29)' }}
                    onClick={handleChange} >
                    {!OpenReplyComments ? `View ${ChildCommentNumber} more reply/replies` : `Hide ${ChildCommentNumber} reply/replies`}
                </a>
            }

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }



        </div>

    )
}

export default ReplyComment
