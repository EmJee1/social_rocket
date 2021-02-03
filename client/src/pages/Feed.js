import FloatingButton from '../components/FloatingButton'
import userImage from '../images/sample-profile.jfif'
import { getAllPosts } from '../functions/auth.api'
import { useState, useEffect, useRef } from 'react'
import CreatePost from '../components/CreatePost'
import Post from '../components/Post'

const FeedPage = ({ isLoggedIn, profilePicture }) => {
	const [showCreatePost, setShowCreatePost] = useState(false)
	const [posts, setPosts] = useState([])

	const containerRef = useRef(null)

	useEffect(() => {
		let mounted = true
		getAllPosts()
			.then(res => {
				if (mounted) {
					setPosts(res.posts)
				}
			})
			.catch(err => console.error(err))

		return () => (mounted = false)
	}, [showCreatePost])

	return (
		<>
			<div className='container' ref={containerRef}>
				<div className='row'>
					<div className='col-12 col-lg-6 mx-auto'>
						<div className='feed-wrapper'>
							{showCreatePost && (
								<CreatePost
									setShowCreatePost={setShowCreatePost}
									profilePicture={profilePicture}
								/>
							)}
							{posts.length > 0 &&
								posts.map((obj, index) => (
									<Post
										key={obj._id}
										postImage={obj.image}
										userImage={obj.authorDetails.profilePicture}
										userName={obj.authorDetails.userName}
										caption={obj.caption}
										likes={obj.likes}
										comments={obj.comments}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
			{isLoggedIn && (
				<FloatingButton
					containerRef={containerRef}
					setShowCreatePost={setShowCreatePost}
				/>
			)}
		</>
	)
}

export default FeedPage
