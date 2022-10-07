import { Card, CardContent, ListItem, ListItemText, Typography } from '@mui/material'
import { getAge } from '../utils'

const MySummary = () => {
    return (
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
                    primary="Main technologies"
                    secondary="Reactjs, JavaScript, TypeScript and NodeJS"
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
    )
}

export default MySummary
