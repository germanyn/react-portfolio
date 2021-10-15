import { AppBar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CssBaseline, Dialog, DialogContent, DialogTitle, Grid, ListItem, ListItemText, Paper, Toolbar, Typography } from '@material-ui/core';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/system';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';
import { ChevronDown, OpenInNew } from 'mdi-material-ui';
import { useEffect, useRef, useState } from 'react';
import useScrollSpy from 'react-use-scrollspy';
import './App.css';
import GermanoCard from './components/GermanoCard';
import { getAge } from './utils';

const App: React.FC = (props) => {
	const theme = createTheme()
	// const root = useRef<HTMLDivElement>(document.getElementById('root'))
	const myProjectsSection = useRef<HTMLDivElement>(null)
	const aboutMeSection = useRef<HTMLDivElement>(null)
	const [selectedImage, setSelectedImage] = useState<ImageDisplay | null>(null)

	const sections: PageSection[] = [
		{
			description: 'Projects',
			ref: myProjectsSection,
		},
		{
			description: 'About Me',
			ref: aboutMeSection,
		},
	]
	const activeSection = useScrollSpy({
	  sectionElementRefs: sections.map(({ ref }) => ref),
	  offsetPx: -400,
	})

	const scrollTo = (ref: React.RefObject<HTMLDivElement>)  => {
		if (!ref.current) return
		ref.current.scrollIntoView({
			behavior: 'smooth',
		})
	}

	const scrollToProjects = () => {
		scrollTo(myProjectsSection)
	}

	// const scrollToAbout = () => {
	// 	scrollTo(aboutMeSection)
	// }

	const almodeFeaturedImage: ImageDisplay = {
		description: 'Ongoing sale',
		url: `${process.env.PUBLIC_URL}/img/almode/almode-2.png`,
	}
	const almodeImages: ImageDisplay[] = [
		{
			description: 'Cash open',
			url: `${process.env.PUBLIC_URL}/img/almode/almode-1.png`,
		},
		{
			description: 'Payment process',
			url: `${process.env.PUBLIC_URL}/img/almode/almode-3.png`,
		},
		{
			description: 'Sales (darkmode)',
			url: `${process.env.PUBLIC_URL}/img/almode/almode-4.png`,
		},
	]

	const selfMenuImages: ImageDisplay[] = [
		{
			description: 'Admin view',
			url: `${process.env.PUBLIC_URL}/img/self-menu/self-menu-1.png`,
		},
		{
			description: 'QR Code generation',
			url: `${process.env.PUBLIC_URL}/img/self-menu/self-menu-2.png`,
		},
		{
			description: 'Order screen',
			url: `${process.env.PUBLIC_URL}/img/self-menu/self-menu-3.png`,
		},
	]

	const SelectableImage: React.FC<{ image: ImageDisplay }> = (props) => (
		<CardActionArea onClick={() => setSelectedImage(props.image)}>
			{props.children}
		</CardActionArea>
	)

	const snapProperties: React.CSSProperties = {
		scrollMarginTop: '64px',
		scrollSnapAlign: 'start',
	}

	useEffect(() => {
		console.log(activeSection)
	}, [activeSection])

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
						{sections.map((section, index) => (
							<Box marginLeft={index ? 2 : undefined}>
								<Button
									variant={ activeSection === index ? 'outlined' : 'text'}
									color="inherit"
									onClick={() => scrollTo(section.ref)}
								> {section.description} </Button>
							</Box>
						))}
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
									alt={selectedImage.description}
								/>
							</Paper>
						</DialogContent>
					</Dialog>
				)}
				<div
					style={{
						...snapProperties,
						height: '100vh',
						maxHeight: '905px',
						display: 'flex',
						justifyContent: 'center',
						background: `url(${process.env.PUBLIC_URL}/img/portfolio-bg.jpg) no-repeat`,
						flexDirection: 'column',
						color: 'white',
						textAlign: 'center',
						position: 'relative',
						backgroundSize: 'cover',
					}}
				>
					<Typography variant="h2" gutterBottom> Looking for a Developer? </Typography>
					<Typography variant="h4"> Someone passionate about code </Typography>
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
						style={{
							backgroundColor: 'lightcyan',
							...snapProperties,
						}}
						ref={myProjectsSection}
						paddingBottom={theme.spacing(2)}
						minHeight="calc(100vh - 64px)"
					>
						<Grid
							container
							maxWidth="sm"
							margin="auto"
							spacing={2}
						>
							<Grid item xs={12}>
								<Typography variant="h2" align="center" gutterBottom> Projects </Typography>
							</Grid>
							<Grid item xs={12} style={{ ...snapProperties }}>
								<Card>
									<CardContent>
										<Typography variant="h3" gutterBottom>
											Almode PDV
										</Typography>
										<Typography variant="h6" color="text.secondary" gutterBottom>
											Complete POS solution with sales, payments, products management, stores, stock control, users, profiles management, customers plans and much more
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
											rel="noreferrer"
										>
											Website
										</Button>
									</CardActions>
								</Card>
							</Grid>
							<Grid item xs={12} style={{ ...snapProperties }}>
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
											rel="noreferrer"
										>
											Menu Sample
										</Button>
										<Button
											size="small"
											endIcon={<OpenInNew />}
											href="https://self-menu.web.app/"
											target="_blank"
											rel="noreferrer"
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
						style={{
							backgroundColor: 'darkcyan',
							...snapProperties,
						}}
						ref={aboutMeSection}
						paddingBottom={theme.spacing(2)}
					>
						<Grid
							container
							maxWidth="md"
							margin="auto"
							spacing={2}
							minHeight="calc(100vh - 64px)"
							maxHeight="905px"
						>
							<Grid item xs={12}>
								<Typography
									variant="h2"
									align="center"
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
											primary={`+${getAge('2017/04/01')} years of experience. Bachelor's degree in computer engineering`}
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
						<Grid
							container
							maxWidth="md"
							margin="auto"
							spacing={2}
							minHeight="calc(100vh - 64px)"
							maxHeight="905px"
						>
							<Grid item xs={12} style={{ ...snapProperties }}>
								<Grid container spacing={2}>
									<Grid item xs>
										<Card>
											<CardContent>
												<Typography variant="h5" gutterBottom>
													My History
												</Typography>
												<Typography variant="body1" gutterBottom>
													Early 2012, I installed an C/C++ IDE before the others college friends and since then i started coding just for fun and as a hobbie.
												</Typography>
												<Typography variant="body1" gutterBottom>
													At 2019, I was hired at Adapcon, working with legacy language 🤦, but out of my work time started taking my first steps on the web with Vuejs.
													This created new activities in the company and later on I was realocated to work on with its web products.
													Also in this company, I worked a lot at better tools to improve code experience and team performance.
												</Typography>
												<Typography variant="body1" gutterBottom>
													A few months before get fire at Adapcon in 2020, I started working on freelance projects, which gave me a good income until mid 2020 and sense of how to build an web app on my own.
												</Typography>
												<Typography variant="body1" gutterBottom>
													One of my freelance jobs was with an company named Almode, initially as UX / UI.
													Later on, I decided to code it's full stack (Vuejs + Java) as well taking charge of important technology and product decisions.
													I was doing so well that at august 2020 i was effectively hired, expanded my knowledge about business and worked as tech leader of up to a team with 9 developers.
												</Typography>
											</CardContent>
										</Card>
									</Grid>
									<Grid item xs={6}>
										<Card>
											<Timeline position="right">
												<TimelineItem>
													<TimelineOppositeContent color="text.secondary" sx={{ maxWidth: '80px' }} >
														2012
													</TimelineOppositeContent>
													<TimelineSeparator>
														<TimelineDot color="primary" />
														<TimelineConnector />
													</TimelineSeparator>
													<TimelineContent>
														Started Computer Engineering at <a href="https://www.univali.br/" target="_blank" rel="noreferrer">UNIVALI</a>
													</TimelineContent>
												</TimelineItem>
												<TimelineItem>
													<TimelineOppositeContent color="text.secondary" sx={{ maxWidth: '80px' }} >
														2016
													</TimelineOppositeContent>
													<TimelineSeparator>
														<TimelineDot color="primary" />
														<TimelineConnector />
													</TimelineSeparator>
													<TimelineContent>Finished college 🎓  </TimelineContent>
												</TimelineItem>
												<TimelineItem>
													<TimelineOppositeContent color="text.secondary" sx={{ maxWidth: '80px' }} >
														2017
													</TimelineOppositeContent>
													<TimelineSeparator>
														<TimelineDot color="primary" />
														<TimelineConnector />
													</TimelineSeparator>
													<TimelineContent>
														Hired at <a href="https://www.adapcon.com.br" target="_blank" rel="noreferrer">Adapcon</a>
													</TimelineContent>
												</TimelineItem>
												<TimelineItem>
													<TimelineOppositeContent color="text.secondary" sx={{ maxWidth: '80px' }} >
														2019
													</TimelineOppositeContent>
													<TimelineSeparator>
														<TimelineDot color="primary" />
														<TimelineConnector />
													</TimelineSeparator>
													<TimelineContent>
														Freelance career
													</TimelineContent>
												</TimelineItem>
												<TimelineItem>
													<TimelineOppositeContent color="text.secondary" sx={{ maxWidth: '80px' }} >
														2020
													</TimelineOppositeContent>
													<TimelineSeparator>
														<TimelineDot color="primary" />
														<TimelineConnector />
													</TimelineSeparator>
													<TimelineContent>
														<p>Fired at Adapcon 🔥</p>
														<p>Hired at <a href="https://www.almode.com/" target="_blank" rel="noreferrer">Almode</a></p>
													</TimelineContent>
												</TimelineItem>
												<TimelineItem>
													<TimelineOppositeContent color="text.secondary" sx={{ maxWidth: '80px' }} >
														2021
													</TimelineOppositeContent>
													<TimelineSeparator>
														<TimelineDot color="primary" />
														<TimelineConnector />
													</TimelineSeparator>
													<TimelineContent>
														<p>Resigned at Almode</p>
														<p>Own projects</p>
													</TimelineContent>
												</TimelineItem>
												<TimelineItem>
													<TimelineOppositeContent color="text.secondary" sx={{ maxWidth: '80px' }} >
														Now
													</TimelineOppositeContent>
													<TimelineSeparator>
														<TimelineDot color="primary" />
													</TimelineSeparator>
													<TimelineContent>
														<p> Looking for a remote job </p>
													</TimelineContent>
												</TimelineItem>
											</Timeline>
										</Card>
									</Grid>
								</Grid>
							</Grid>
							{/* <Grid item xs={12} style={{ ...snapProperties }}>
								<Card>

								</Card>
							</Grid> */}
						</Grid>
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

type PageSection = {
	description: string
	ref: React.RefObject<HTMLDivElement>
}

export default App;
