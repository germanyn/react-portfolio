import { AppBar, Button, Toolbar } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const AppLayout: React.FC = (props) => {
	return (
		<LayoutRoot>
			<AppBar>
				<Toolbar>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			{/* <LayoutWrapper> */}
				<LayoutContainer>
					<LayoutContent>
						{props.children}
					</LayoutContent>
				</LayoutContainer>
			{/* </LayoutWrapper> */}
		</LayoutRoot>
	);
}

const LayoutRoot = styled('div')(
	({ theme }) => ({
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		height: '100%',
		overflow: 'hidden',
		width: '100%'
	})
);

// const LayoutWrapper = styled('div')(
// 	({ theme }) => ({
// 		display: 'flex',
// 		flex: '1 1 auto',
// 		overflow: 'hidden',
// 		paddingTop: 64,
// 		[theme.breakpoints.up('lg')]: {
// 			paddingLeft: 256
// 		}
// 	})
// );

const LayoutContainer = styled('div')({
	display: 'flex',
	flex: '1 1 auto',
	overflow: 'hidden'
});

const LayoutContent = styled('div')({
	flex: '1 1 auto',
	height: '100%',
	overflow: 'auto'
});

export default AppLayout;
