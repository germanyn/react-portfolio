import {
	AppBar, Box, Button,
	CardActionArea, createTheme, CssBaseline, Dialog,
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

	const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
		if (!ref.current) return
		ref.current.scrollIntoView({
			behavior: 'smooth',
		})
	}

	const scrollToProjects = () => {
		scrollTo(myProjectsSection)
	}

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
									<div> Check my projects </div>
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
								<Grid item style={{ ...snapProperties }}>
									<ProjectCard
										title="Almode PDV"
										description="Complete POS solution with sales, payments, products management, stores, stock control, users, profiles management, customers plans and much more"
										featuredImage={almodeFeaturedImage}
										onImageClick={setSelectedImage}
										images={almodeImages}
										links={[{
											url: 'https://www.almode.com',
											description: 'Website',
										}]}
									/>
								</Grid>
								<Grid item style={{ ...snapProperties }}>
									<ProjectCard
										title="Self Menu"
										description="Solo project to call waiter with the user's mobile device after scanning a QR Code"
										onImageClick={setSelectedImage}
										images={selfMenuImages}
										links={[
											{
												url: 'https://self-menu.web.app/60e3d8327ec3830a4c088911',
												description: 'Menu Sample',
											},
											{
												url: 'https://self-menu.web.app/',
												description: 'Website',
											},
										]}
										mobile
									/>
								</Grid>
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
								<Grid container item xs={12} spacing={theme.spacing(2)} style={{ ...snapProperties }}>
									<Grid item xs>
										
									</Grid>
									<Grid
										item
										xs={12}
										md={6}
										paddingRight={theme.spacing(2)}
									>
										<MyStoryLine/>
									</Grid>
								</Grid>
								{/* <Grid item xs={12} style={{ ...snapProperties }}>
									<Card>

									</Card>
								</Grid> */}
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
