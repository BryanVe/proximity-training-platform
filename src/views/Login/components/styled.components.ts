import styled from '@emotion/styled'

export const LoginForm = styled.form`
	display: grid;
	position: absolute;
	width: 90%;
	max-width: 320px;
	height: 500px;
	transform: translate(-50%, -50%);
	left: 50%;
	top: 50%;
	border-radius: ${({ theme }) => theme.radius.xl};
	color: white;
	background: linear-gradient(
		135deg,
		rgba(235, 28, 133, 1) 0%,
		rgba(248, 158, 74, 1) 100%
	);
`
