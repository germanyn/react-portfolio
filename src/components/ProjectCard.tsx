import { Button, Card, CardActions, CardContent, Collapse, Grid, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import { ChevronDown, ClockOutline, OpenInNew } from 'mdi-material-ui'
import React, { useState } from 'react'
import ExpandMore from './ExpandMore'
import SelectableImage, { ImageDisplay } from './SelectableImage'

interface ExternalLink {
    description: string
    url: string
}

interface Props {
    title?: string
    description?: string
    featuredImage?: ImageDisplay
    onImageClick?: (image: ImageDisplay) => void
    images?: ImageDisplay[]
    timeExperience?: string
    links?: ExternalLink[]
    mobile?: boolean
}

const ProjectCard = ({
    title,
    description,
    featuredImage,
    onImageClick,
    images,
    timeExperience,
    links,
    mobile = false,
}: Props) => {
    const theme = useTheme()
    const [expanded, setExpanded] = useState(false)
    return (
        <Card>
            <CardContent>
                {title &&<Typography variant="h3" gutterBottom>
                    {title}
                </Typography>}
                {description && <Typography variant="h6" color="text.secondary" gutterBottom>
                    {description}
                </Typography>}
                <Grid
                    container
                    spacing={2}
                    style={{ paddingTop: theme.spacing(2) }}
                >
                    {!mobile
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
            </CardContent>
            <CardActions disableSpacing>
                {links?.map((link, index) => (
                    <Button
                        key={index}
                        endIcon={<OpenInNew />}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {link.description}
                    </Button>
                ))}
                <ExpandMore
                    expand={expanded}
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ChevronDown />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {timeExperience && <ListItem>
                    <ListItemIcon>
                        <ClockOutline />
                    </ListItemIcon>
                    <ListItemText
                        secondary={timeExperience}
                    />
                </ListItem>}
                <CardContent>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default ProjectCard
