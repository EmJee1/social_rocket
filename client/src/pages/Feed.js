import userImage from '../images/sample-profile.jfif'
import postImage from '../images/sample-image.jpg'
import Post from '../components/Post'

const FeedPage = () => {
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 col-lg-6 mx-auto'>
					<div className='feed-wrapper'>
						<Post
							postImage={postImage}
							userImage={userImage}
							userName='Jimmie Maldonado'
							caption='Hello, this is my first post on Social Rocket'
							likes={[{}, {}, {}, {}, {}, {}, {}]}
							comments={[{}, {}]}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FeedPage