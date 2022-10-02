import { CardActionArea, CardMedia } from "@mui/material"

export type ImageDisplay = {
	description: string
	url: string
}

export interface Props {
    image: ImageDisplay
    onClick?: (image: ImageDisplay) => void 
}

const SelectableImage: React.FC<Props> = ({
    image,
    onClick,
}) => (
    <CardActionArea
        onClick={() => onClick && onClick(image)}
    >
        <CardMedia
            component="img"
            image={image.url}
            alt={image.description}
        />
    </CardActionArea>
)

export default SelectableImage