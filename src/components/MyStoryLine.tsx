import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab'
import { Card } from '@mui/material'

const MyStoryLine = () => {
    return (
        <Card>
            <Timeline position="alternate">
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        2012
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        Started Computer Engineering at <a href="https://www.univali.br/" target="_blank" rel="noreferrer">UNIVALI</a>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        2016
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Finished college 🎓</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        2017
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        Hired at <a href="https://www.adapcon.com.br" target="_blank" rel="noreferrer">Adapcon</a>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        2019
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        Freelance career
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        2020
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        Hired at <a href="https://www.almode.com/" target="_blank" rel="noreferrer">Almode</a>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        2021
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent> Own projects </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent> Hired at <a href="https://www.groundbreaker.co/" target="_blank" rel="noreferrer">Groundbreaker</a> </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        Now
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color="primary" />
                    </TimelineSeparator>
                    <TimelineContent>Looking for new oportunities</TimelineContent>
                </TimelineItem>
            </Timeline>
        </Card >
    )
}

export default MyStoryLine
