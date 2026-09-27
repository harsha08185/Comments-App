import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, toggleLike, deleteComment} = props
  const {id, userName, userComment, isLike} = commentDetails
  const likeStyle = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const commentTime = formatDistanceToNow(new Date())

  const showLike = () => {
    toggleLike(id)
  }

  const delComment = () => {
    deleteComment(id)
  }
  return (
    <li>
      <p>{userName}</p>
      <p>{commentTime}</p>
      <div>
        <p>{userComment}</p>
        <button type="button" onClick={showLike}>
          <img src={likeStyle} alt="like" />
          <p>Like</p>
        </button>
        <button type="button" onClick={delComment} data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
