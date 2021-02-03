import paperPlaneSVG from '../images/paper-plane-solid.svg'
import { submitNewPost } from '../functions/auth.api'
import { useState, useEffect, useRef } from 'react'

const CreatePost = ({ createPostRef, setShowCreatePost, profilePicture }) => {
	const [caption, setCaption] = useState('')
	const [image, setImage] = useState({})

	const previewImageRef = useRef(null)

	useEffect(() => {
		if (image.name) previewImageRef.current.src = URL.createObjectURL(image)
	}, [image])

	const submitHandler = e => {
		e.preventDefault()

		submitNewPost(image, caption)
			.then(res => setShowCreatePost(false))
			.catch(err => console.error(err.message))
	}

	return (
		<div ref={createPostRef} className='post'>
			<form onSubmit={submitHandler}>
				<div className='post-user'>
					<div className='post-user-wrapper'>
						<div
							className='post-user-image'
							style={{ backgroundImage: `url('${profilePicture}')` }}
						></div>
						<h5 className='post-user-name'>
							{localStorage.getItem('userName')}
						</h5>
					</div>
				</div>
				<hr />
				<div className='post-image create-post-image'>
					{image.name && (
						<img ref={previewImageRef} src='' alt='preview your post' />
					)}
					<label className='custom-file-input create-post-file-input'>
						<input type='file' onChange={e => setImage(e.target.files[0])} />
						{!image.name ? 'Upload your image' : 'Choose a different image'}
					</label>
				</div>
				<div className='create-post-caption post-caption'>
					<input
						type='text'
						className='primary-input caption-input'
						placeholder='Your caption goes here'
						onChange={e => setCaption(e.target.value)}
					/>
				</div>
				<div className='post-actions'>
					<div className='post-actions-outer'>
						<div className='post-actions-right'>
							<div className='post-actions-button' onClick={submitHandler}>
								<img src={paperPlaneSVG} alt='Send the post' />
								<p className='bold'>Post</p>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default CreatePost
