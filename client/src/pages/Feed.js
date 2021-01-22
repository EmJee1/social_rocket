import userImage from '../images/sample-profile.jfif'
import { getAllPosts } from '../functions/auth.api'
import { useState, useEffect } from 'react'
import Post from '../components/Post'

const FeedPage = () => {
	const [posts, setPosts] = useState([])

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
	}, [])

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 col-lg-6 mx-auto'>
					<div className='feed-wrapper'>
						{posts.length &&
							posts.map((obj, index) => (
								<Post
									key={obj._id}
									postImage={obj.image}
									userImage={userImage}
									userName={obj.author}
									caption={obj.caption}
									likes={obj.likes}
									comments={obj.comments}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default FeedPage