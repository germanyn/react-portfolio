import {
	AppBar, Box, Button,
	Card,
	CardActionArea, CardContent, createTheme, CssBaseline, Dialog,
	DialogContent,
	DialogTitle,
	Grid, Paper, StyledEngineProvider, ThemeProvider, Toolbar,
	Typography
} from '@mui/material';
import { ChevronDown } from 'mdi-material-ui';
import { useRef, useState } from 'react';
import useScrollSpy from 'react-use-scrollspy';
import './App.css';
import GermanoCard from './components/GermanoCard';
import MyStoryLine from './components/MyStoryLine';
import MySummary from './components/MySummary';
import ProjectCard from './components/ProjectCard';
import { ImageDisplay } from './components/SelectableImage';
import { projects } from './data/projects';

const App: React.FC = (props) => {
	const theme = createTheme()
	// const root = useRef<HTMLDivElement>(document.getElementById('root'))
	const myProjectsSection = useRef<HTMLDivElement>(null)
	const aboutMeSection = useRef<HTMLDivElement>(null)
	const sayHiSection = useRef<HTMLDivElement>(null)
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
		{
			description: 'Say Hi',
			ref: sayHiSection,
		},
	]
	const activeSection = useScrollSpy({
		sectionElementRefs: sections.map(({ ref }) => ref),
		offsetPx: -400,
	})

	const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
		if (!ref.current) return
		ref.current.scrollIntoView({
			behavior: 'smooth',
		})
	}

	const scrollToProjects = () => {
		scrollTo(myProjectsSection)
	}

	const snapProperties: React.CSSProperties = {
		scrollMarginTop: theme.mixins.toolbar.minHeight,
		scrollSnapAlign: 'start',
	}

	return (
		<StyledEngineProvider injectFirst>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<Box
					display="flex"
					flexDirection="column"
					minHeight="100vh"
				>
					<AppBar variant="outlined">
						<Toolbar>
							<Typography fontFamily="Beleren" variant="h4">
								GG
							</Typography>
							<Box flexGrow={1} />
							{sections.map((section, index) => (
								<Box marginLeft={index ? 2 : undefined} key={index}>
									<Button
										variant={activeSection === index ? 'outlined' : 'text'}
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
					<Box component='main' flex={1}>
						<Box
							style={{
								...snapProperties,
								background: `url(${process.env.PUBLIC_URL}/img/portfolio-bg.jpg) no-repeat`,
								backgroundSize: 'cover',
							}}
							height='100vh'
							maxHeight='905px'
							display='flex'
							justifyContent='center'
							flexDirection='column'
							color='white'
							textAlign='center'
							position='relative'
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
									<div> Check out my projects! </div>
									<ChevronDown />
								</Typography>
							</CardActionArea>
						</Box>
						<Box
							style={{ backgroundColor: 'lightcyan' }}
							paddingRight={theme.spacing(2)}
							paddingBottom={theme.spacing(2)}
							minHeight='calc(100vh - 64px)'
							display='flex'
						>
							<Grid
								container
								maxWidth="lg"
								margin="auto"
								style={{ ...snapProperties }}
								spacing={2}
								direction="column"
							>
								<Grid
									item
									style={{ ...snapProperties }}
									ref={myProjectsSection}
								>
									<Typography variant="h2" align="center" gutterBottom> Projects </Typography>
								</Grid>
								{projects.map(project => (
									<Grid item style={{ ...snapProperties }}>
										<ProjectCard
											{...project}
											onImageClick={setSelectedImage}
										/>
									</Grid>	
								))}
							</Grid>
						</Box>
						<Box
							style={{ backgroundColor: 'darkcyan' }}
							paddingRight={theme.spacing(2)}
							paddingBottom={theme.spacing(2)}
						>
							<Grid
								container
								maxWidth="md"
								margin="auto"
								spacing={2}
								minHeight="calc(100vh - 64px)"
								style={{ ...snapProperties }}
								ref={aboutMeSection}
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
											maxWidth: '100%',
										}}
									>
										<GermanoCard language="en" />
									</div>
								</Grid>
								<Grid
									item
									xs
									paddingRight={theme.spacing(2)}
								>
									<MySummary/>
								</Grid>
							</Grid>
							<Grid
								container
								maxWidth="lg"
								margin="auto"
								spacing={2}
								minHeight="calc(100vh - 64px)"
							>
								<Grid item xs={12}>
									<Typography
										variant="h2"
										align="center"
										color="white"
									>
										Story Line
									</Typography>
								</Grid>
								<Grid container item xs={12} spacing={theme.spacing(2)} style={{ ...snapProperties }}>
									<Grid
										item
										xs={12}
										paddingRight={theme.spacing(2)}
									>
										<MyStoryLine/>
									</Grid>
								</Grid>
							</Grid>
						</Box>
						<Box
							style={{ backgroundColor: 'lightcyan' }}
							paddingRight={theme.spacing(2)}
							paddingBottom={theme.spacing(2)}
							minHeight='calc(100vh - 64px)'
							display='flex'
						>
							<Grid
								container
								maxWidth="md"
								margin="auto"
								spacing={2}
								minHeight="calc(100vh - 64px)"
								style={{ ...snapProperties }}
								ref={aboutMeSection}
							>
								<Grid item xs={12}>
									<Typography
										variant="h2"
										align="center"
									>
										Get In Touch
									</Typography>
								</Grid>
								<Grid item xs={12}>
										<Card style={{ maxWidth: '420px', margin: 'auto' }}>
											<CardContent style={{ textAlign: 'center' }}>
												<Typography gutterBottom>
													I'm looking for new oportunities, so is a good posibility to you say hi
												</Typography>
												<Button
													target='_blank'
													rel='noopener noreferrer'
													href='mailto:germanogascho@gmail.com'
													variant='outlined'
												>
													Say Hi
												</Button>
											</CardContent>
										</Card>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Box>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

type PageSection = {
	description: string
	ref: React.RefObject<HTMLDivElement>
}

type Skill = {
	description: string
	tag: string[]
}

export default App;
