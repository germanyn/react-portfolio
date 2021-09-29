import { createTheme, StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import GermanoCard from './components/GermanoCard';
import { ChevronDown, OpenInNew } from 'mdi-material-ui'
import { AppBar, Toolbar, Button, CssBaseline, Typography, Card, CardHeader, CardContent, CardActionArea, CardMedia, Grid, Dialog, DialogContent, DialogTitle, Paper, CardActions, Icon, ListItem, ListItemText } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { useRef, useState } from 'react';
import { getAge } from './utils';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';

const App: React.FC = (props) => {
	const theme = createTheme()
	const myProjectsSection = useRef<HTMLDivElement>(null)
	const aboutMeSection = useRef<HTMLDivElement>(null)
	const [selectedImage, setSelectedImage] = useState<ImageDisplay | null>(null)

	const scrollToProjects = () => {
		if (!myProjectsSection.current) return
		window.scrollTo({
			top: myProjectsSection.current.getBoundingClientRect().top + window.pageYOffset - 64,
			behavior: 'smooth',
		})
	}

	const scrollToAbout = () => {
		if (!aboutMeSection.current) return
		window.scrollTo({
			top: aboutMeSection.current.getBoundingClientRect().top + window.pageYOffset - 64,
			behavior: 'smooth',
		})
	}

	const almodeFeaturedImage: ImageDisplay = {
		description: 'Ongoing sale',
		url: '/img/almode/almode-2.png',
	}
	const almodeImages: ImageDisplay[] = [
		{
			description: 'Cash open',
			url: '/img/almode/almode-1.png',
		},
		{
			description: 'Payment process',
			url: '/img/almode/almode-3.png',
		},
		{
			description: 'Sales (darkmode)',
			url: '/img/almode/almode-4.png',
		},
	]

	const selfMenuImages: ImageDisplay[] = [
		{
			description: 'Admin view',
			url: '/img/self-menu/self-menu-1.png',
		},
		{
			description: 'QR Code generation',
			url: '/img/self-menu/self-menu-2.png',
		},
		{
			description: 'Order screen',
			url: '/img/self-menu/self-menu-3.png',
		},
	]

	const SelectableImage: React.FC<{ image: ImageDisplay }> = (props) => (
		<CardActionArea onClick={() => setSelectedImage(props.image)}>
			{props.children}
		</CardActionArea>
	)

	return (
		<StyledEngineProvider injectFirst>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<AppBar variant="outlined">
					<Toolbar>
						<Typography fontFamily="Beleren" variant="h4">
							GG
						</Typography>
						<Box flexGrow={1} />
						<Box marginLeft={2}>
							<Button
								variant="text"
								color="inherit"
								onClick={scrollToProjects}
							> Projects </Button>
						</Box>
						<Box marginLeft={2}>
							<Button
								variant="text"
								color="inherit"
								onClick={scrollToAbout}
							> About </Button>
						</Box>
						<Box marginLeft={2}>
							<Button
								variant="outlined"
								color="inherit"
							> Say Hi </Button>
						</Box>
					</Toolbar>
				</AppBar>

				{selectedImage && (
					<Dialog
						open
						onClose={() => setSelectedImage(null)}
						maxWidth="lg"
					>
						<DialogTitle>
							<Typography variant="h4">
								{selectedImage.description}
							</Typography>
						</DialogTitle>
						<DialogContent>
							<Paper>
								<img
									src={selectedImage.url}
									width="100%"
								/>
							</Paper>
						</DialogContent>
					</Dialog>
				)}
				<div
					style={{
						height: '100vh',
						maxHeight: '905px',
						display: 'flex',
						justifyContent: 'center',
						background: 'url(/img/portfolio-bg.jpg) no-repeat',
						flexDirection: 'column',
						color: 'white',
						textAlign: 'center',
						position: 'static',
						backgroundSize: 'cover',
					}}
				>
					<Typography variant="h2" gutterBottom> Looking for a Developer? </Typography>
					<Typography variant="h4"> A passionate about code one! </Typography>
					<CardActionArea
						style={{
							position: 'absolute',
							bottom: '0px',
							width: '100%',
							paddingBottom: theme.spacing(2),
							paddingTop: theme.spacing(2),
						}}
						onClick={scrollToProjects}
					>
						<Typography variant="subtitle1">
							<div> Check my projects </div>
							<ChevronDown />
						</Typography>
					</CardActionArea>
				</div>
				<Grid container>
					<Grid
						xs={12}
						style={{ backgroundColor: 'lightcyan' }}
						ref={myProjectsSection}
						paddingBottom={theme.spacing(2)}
						minHeight="calc(100vh - 64px)"
					>
						<Grid
							container
							maxWidth="md"
							margin="auto"
							spacing={2}
						>
							<Grid item xs={12}>
								<Typography variant="h2" align="center" gutterBottom> Projects </Typography>
							</Grid>
							<Grid item xs={12}>
								<Card>
									<CardContent>
										<Typography variant="h3" gutterBottom>
											Almode PDV
										</Typography>
										<Typography variant="h6" color="text.secondary" gutterBottom>
											Complete POS solution with sales, payments, products, stock control, users, profiles management, customers plans and more.
										</Typography>
										{/* <Typography variant="h6" color="text.secondary" gutterBottom>
											&emsp;Responsible for the entire UI / UX of application, technology and product decisions, Vue.js + Typescript with Java backend programming and team leader with 9 members.
										</Typography> */}
										<Grid
											container
											spacing={2}
											style={{ paddingTop: theme.spacing(2) }}
										>
											<Grid item xs={9}>
												<SelectableImage image={almodeFeaturedImage}>
													<CardMedia
														component="img"
														image={almodeFeaturedImage.url}
														alt={almodeFeaturedImage.description}
													/>
												</SelectableImage>
											</Grid>
											<Grid item xs={3}>
												<Grid container spacing={2}>
													{almodeImages.map((image) =>
														<Grid item xs={12} key={image.url}>
															<SelectableImage image={image}>
																<CardMedia
																	component="img"
																	image={image.url}
																	alt={image.description}
																/>
															</SelectableImage>
														</Grid>
													)}
												</Grid>
											</Grid>
										</Grid>
									</CardContent>
									<CardActions>
										<Button
											size="small"
											endIcon={<OpenInNew />}
											href="https://www.almode.com"
											target="_blank"
										>
											Website
										</Button>
									</CardActions>
								</Card>
							</Grid>
							<Grid item xs={12}>
								<Card>
									<CardContent>
										<Typography variant="h3" gutterBottom>
											Self Menu
										</Typography>
										<Typography variant="h6" color="text.secondary" gutterBottom>
											Solo project to call waiter with the user's mobile device after scanning a QR Code
										</Typography>
										{/* <Typography variant="h6" color="text.secondary" gutterBottom>
											Developed entirely in TypeScript with React.js as frontend and Nodejs as backend. Others technologies includes GraphQL, mongoose, integration tests with jasmine and firebase hosting/functions.
										</Typography> */}
										<Grid
											container
											spacing={2}
											style={{ paddingTop: theme.spacing(2) }}
										>
											{selfMenuImages.map((image) =>
												<Grid item xs={4} key={image.url}>
													<SelectableImage image={image}>
														<CardMedia
															component="img"
															image={image.url}
															alt={image.description}
														/>
													</SelectableImage>
												</Grid>
											)}
										</Grid>
									</CardContent>
									<CardActions>
										<Button
											size="small"
											endIcon={<OpenInNew />}
											href="https://self-menu.web.app/60e3d8327ec3830a4c088911"
											target="_blank"
										>
											Menu Sample
										</Button>
										<Button
											size="small"
											endIcon={<OpenInNew />}
											href="https://self-menu.web.app/"
											target="_blank"
										>
											Website
										</Button>
									</CardActions>
								</Card>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						xs={12}
						item
						style={{ backgroundColor: 'darkcyan' }}
						ref={aboutMeSection}
						minHeight="calc(100vh - 64px)"
						maxHeight="905px"
					>
						<Grid
							container
							maxWidth="md"
							margin="auto"
							spacing={2}
						>
							<Grid item xs={12}>
								<Typography
									variant="h2"
									align="center"
									gutterBottom
									color="white"
								>
									About Me
								</Typography>
							</Grid>
							<Grid
								item
								xs="auto"
								style={{ color: 'initial' }}
							>
								<div
									style={{
										transformOrigin: '0 0',
										transform: `translate(0, 0) scale(0.75)`,
										height: `${0.75 * 700}px`,
										width: `${0.75 * 500}px`,
									}}
								>
									<GermanoCard language="en" />
								</div>
							</Grid>
							<Grid
								item
								xs
							>
								<Card>
									<CardContent>
										<Typography variant="h5">
											Hi, I'm Germano
										</Typography>
									</CardContent>
									<ListItem>
										<ListItemText
											primary={`${getAge('1994/11/26')} years old \u2013 🎂 11/26/1994`}
										/>
									</ListItem>
									<ListItem>
										<ListItemText
											primary="Live in Brazil 🇧🇷"
										/>
									</ListItem>
									<ListItem>
										<ListItemText
											primary="Bachelor's degree in computer engineering"
										/>
									</ListItem>
									<ListItem>
										<ListItemText
											primary={`+${getAge('2017/04/01')} years of experience`}
										/>
									</ListItem>
									<ListItem>
										<ListItemText
											primary="Main languages"
											secondary="JavaScript, TypeScript and Java"
										/>
									</ListItem>
									<ListItem>
										<ListItemText
											primary="Skills"
											secondary="Reactjs, Vuejs, Spring Boot, SQL, REST API, GraphQL, MongoDB, Mongoose, AWS (DynamoDB, S3, CloudFront, Elastic Beanstalk, IAM, RDS, Lambda), Firebase services"
										/>
									</ListItem>
									<ListItem>
										<ListItemText
											primary="Hobbies"
											secondary="MTG card game, gameplay videos, metroidvania games, TV series and coding"
										/>
									</ListItem>
								</Card>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						xs={12}
						item
						style={{ backgroundColor: 'lightcyan' }}
						minHeight="calc(100vh - 64px)"
						maxHeight="905px"
					>
						<Timeline position="alternate">
							<TimelineItem>
								<TimelineOppositeContent color="text.secondary">
									2012
								</TimelineOppositeContent>
								<TimelineSeparator>
									<TimelineDot color="primary"/>
									<TimelineConnector />
								</TimelineSeparator>
								<TimelineContent>Started on Computer Engineering at <a href="https://www.univali.br/" target="_blank">UNIVALI</a></TimelineContent>
							</TimelineItem>
							<TimelineItem>
								<TimelineOppositeContent color="text.secondary">
									2016
								</TimelineOppositeContent>
								<TimelineSeparator>
									<TimelineDot color="primary"/>
									<TimelineConnector />
								</TimelineSeparator>
								<TimelineContent>Finished my formation 🎓 🎉 </TimelineContent>
							</TimelineItem>
							<TimelineItem>
								<TimelineOppositeContent color="text.secondary">
									2017
								</TimelineOppositeContent>
								<TimelineSeparator>
									<TimelineDot color="primary"/>
									<TimelineConnector />
								</TimelineSeparator>
								<TimelineContent>
									Hired at <a href="https://www.adapcon.com.br" target="blank">Adapcon</a>
								</TimelineContent>
							</TimelineItem>
							<TimelineItem>
								<TimelineOppositeContent color="text.secondary">
									2020
								</TimelineOppositeContent>
								<TimelineSeparator>
									<TimelineDot color="primary"/>
									<TimelineConnector />
								</TimelineSeparator>
								<TimelineContent>
									<p>Fired at Adapcon 🔥</p>
									<p>Started a freelance career </p>
									<p>Hired at <a href="https://www.almode.com/" target="blank">Almode</a> </p>
								</TimelineContent>
							</TimelineItem>
							<TimelineItem>
								<TimelineOppositeContent color="text.secondary">
									2021
								</TimelineOppositeContent>
								<TimelineSeparator>
									<TimelineDot color="primary"/>
									<TimelineConnector />
								</TimelineSeparator>
								<TimelineContent>
									<p>Resigned at Almode</p>
									<p>Work on Self Menu project</p>
								</TimelineContent>
							</TimelineItem>
							<TimelineItem>
								<TimelineOppositeContent color="text.secondary">
									Now
								</TimelineOppositeContent>
								<TimelineSeparator>
									<TimelineDot color="primary"/>
								</TimelineSeparator>
								<TimelineContent>
									Trying a remote job
								</TimelineContent>
							</TimelineItem>
						</Timeline>
					</Grid>
				</Grid>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

type ImageDisplay = {
	description: string
	url: string
}

export default App;
