import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material'
import { ChevronDown, OpenInNew } from 'mdi-material-ui'
import SelectableImage, { ImageDisplay } from './SelectableImage'

interface ExternalLink {
    description: string
    url: string
}

interface Props {
    title: string
    description: string
    role: string
    technologies: string[]
    achievements?: string[]
    featuredImage?: ImageDisplay
    onImageClick?: (image: ImageDisplay) => void
    images?: ImageDisplay[]
    duration: string
    links?: ExternalLink[]
    displayAsMobile?: boolean
}

const ProjectCard = ({
    title,
    description,
    role,
    achievements,
    featuredImage,
    onImageClick,
    images,
    duration,
    links,
    displayAsMobile = false,
    technologies,
}: Props) => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Box
                            display='flex'
                            flexDirection='column'
                            justifyContent='space-between'
                            flex={1}
                        >
                            <Box flex={1}>
                                <Box
                                    display='flex'
                                    justifyContent='space-between'
                                    alignItems='flex-start'
                                >
                                    <Typography variant="h3" gutterBottom>
                                        {title}
                                    </Typography>
                                    {links && <IconButton
                                        href={links[0].url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <OpenInNew color='primary' />
                                    </IconButton>}
                                </Box>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    {description}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6" color="text.secondary">
                                    <span style={{ fontWeight: 'bold' }}> Role: </span> {role}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    <span style={{ fontWeight: 'bold' }}> Technologies: </span> {technologies.join(', ')}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} alignSelf='center'>
                        <Grid container spacing={2}>
                            {!displayAsMobile
                                ? (<>
                                    {featuredImage && <Grid item xs={9}>
                                        <SelectableImage
                                            image={featuredImage}
                                            onClick={onImageClick}
                                        />
                                    </Grid>}
                                    {images && <Grid item xs={3}>
                                        <Grid container spacing={2}>
                                            {images.map((image, index) =>
                                                <Grid item xs={12} key={index}>
                                                    <SelectableImage
                                                        image={image}
                                                        onClick={onImageClick}
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>}
                                </>)
                                : (<>
                                    {images?.map((image, index) =>
                                        <Grid item xs={4} key={index}>
                                            <SelectableImage
                                                image={image}
                                                onClick={onImageClick}
                                            />
                                        </Grid>
                                    )}
                                </>)
                            }
                        </Grid>
                        <Typography
                            textAlign='center'
                            fontStyle='italic'
                            color='text.secondary' pt={2}
                        >
                            Click on the image to expand
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ChevronDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography color="primary">Show more</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        <span style={{ fontWeight: 'bold' }}> Duration: </span> {duration}
                    </Typography>
                    {achievements && (<Typography variant="h6" color="text.secondary">
                        <div style={{ fontWeight: 'bold' }}> Achievements: </div>
                        <ul>
                            {achievements.map(achievement => (
                                <li>{achievement}</li>
                            ))}
                        </ul>
                    </Typography>)}
                </AccordionDetails>
            </Accordion>
        </Card>
    )
}

export default ProjectCard
