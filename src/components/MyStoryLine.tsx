import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab'
import { Card } from '@mui/material'

const MyStoryLine = () => {
    return (
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
    )
}

export default MyStoryLine
