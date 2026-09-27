import {Component} from 'react'
import {v4 as uuid4} from 'uuid'
import CommentItem from '../CommentItem/index'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    userComments: [],
    commentCount: 0,
    name: '',
    comment: '',
  }

  onAddName = event => {
    this.setState({name: event.target.value})
  }

  onAddComment = event => {
    this.setState({comment: event.target.value})
  }

  toggleLike = id => {
    this.setState(prevState => ({
      userComments: prevState.userComments.map(eachComment => {
        if (id === eachComment.id) {
          return {
            ...eachComment,
            isLike: !eachComment.isLike,
          }
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    this.setState(prevState => ({
      userComments: prevState.userComments.filter(
        eachComment => eachComment.id !== id,
      ),
      commentCount: prevState.commentCount - 1,
    }))
  }

  formSubmit = event => {
    event.preventDefault()
    const {comment, name} = this.state

    const newComment = {
      id: uuid4(),
      userName: name,
      userComment: comment,
      isLike: false,
    }

    if (name !== '' && comment !== '') {
      this.setState(prevState => {
        const updateUserComment = [...prevState.userComments, newComment]
        return {
          userComments: updateUserComment,
          commentCount: prevState.commentCount + 1,
          name: '',
          comment: '',
        }
      })
    }
  }

  render() {
    const {userComments, commentCount, name, comment} = this.state
    return (
      <div>
        <div>
          <h1>Comments</h1>
          <p>Say Something about 4.0 Technologies</p>

          <form onSubmit={this.formSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              onChange={this.onAddName}
              value={name}
            />
            <textarea
              placeholder="Your Comment"
              onChange={this.onAddComment}
              value={comment}
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
            <div>
              <button type="submit">Add Comment</button>
            </div>
          </form>

          <hr />
          <div>
            <p>{commentCount}</p>
            <p>Comments</p>
          </div>
          <ul>
            {userComments.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleLike={this.toggleLike}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
