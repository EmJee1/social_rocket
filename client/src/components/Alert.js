import { motion } from 'framer-motion'

const Alert = ({ type, alertText, transitionTime }) => {
	let classNames

	if (type === 'danger') {
		classNames = ['danger-alert', 'alert-progress']
	} else if (type === 'success') {
		classNames = ['success-alert', 'success-progress']
	}

	return (
		<motion.div
			className={`alert ${classNames[0]}`}
			role='alert'
			exit={{ x: '100vw' }}
			transition={{ duration: 0.6 }}
			key='error'
		>
			{alertText}
			<motion.span
				className={`alert-progress ${classNames[1]}`}
				initial={{ width: '0%' }}
				animate={{ width: '100%' }}
				transition={{ duration: transitionTime }}
			></motion.span>
		</motion.div>
	)
}

export default Alert