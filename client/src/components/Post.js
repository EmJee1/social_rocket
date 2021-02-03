import rocketSVG from '../images/rocket-solid.svg'
import commentsSVG from '../images/comments.svg'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const Post = ({ postImage, userImage, userName, caption, likes, comments }) => {
	const [captionExpanded, setCaptionExpanded] = useState(false)
	const captionRef = useRef(null)

	const captionStyle = {}
	if (captionExpanded) {
		captionStyle.whiteSpace = 'initial'
	}

	return (
		<div className='post'>
			<div className='post-user'>
				<Link to={`/user/${userName}`} className='post-user-wrapper'>
					<div
						className='post-user-image'
						style={{ backgroundImage: `url('${userImage}')` }}
					></div>
					<h5 className='post-user-name'>{userName}</h5>
				</Link>
			</div>
			<hr />
			<div className='post-image'>
				<img src={postImage} alt='Sample' />
			</div>
			<div className='post-caption'>
				<p ref={captionRef} style={captionStyle}>
					<span className='bold'>{userName}:</span>
					{caption}
				</p>
				<span
					className='read-more'
					onClick={() => setCaptionExpanded(!captionExpanded)}
				>
					Read {captionExpanded ? 'less' : 'more'}
				</span>
			</div>
			<div className='post-actions'>
				<div className='post-actions-outer'>
					<div className='post-actions-left'>
						<div className='post-actions-button'>
							<img src={rocketSVG} alt='Give this post a rocket' />
							{likes.length}
						</div>
						<div className='post-actions-button'>
							<img src={commentsSVG} alt='Leave a comment on this post' />
							{comments.length}
						</div>
					</div>
					<div className='post-actions-right'></div>
				</div>
			</div>
		</div>
	)
}

export default Post
