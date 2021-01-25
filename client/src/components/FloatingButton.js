import featherImage from '../images/feather-alt-solid.svg'
import { motion } from 'framer-motion'

const FloatingButton = ({ containerRef, setShowCreatePost }) => {
	return (
		<div
			className='floating-button'
			onClick={() => {
				if (containerRef.current) {
					setShowCreatePost(true)
					containerRef.current.scrollIntoView({ behaviour: 'smooth' })
				}
			}}
		>
			<motion.img
				src={featherImage}
				initial={{ rotate: '-10deg', x: '-50%', y: '-50%', scale: 0.9 }}
				whileHover={{ rotate: '0deg', x: '-50%', y: '-50%', scale: 1.3 }}
			/>
		</div>
	)
}

export default FloatingButton