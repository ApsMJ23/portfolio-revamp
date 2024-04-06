import {Box, Button, Container, ListItemText, Typography} from "@mui/material";
import {ProjectContent} from '../../../../../../assets/Text/ProjectContent.ts';
import React, {useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import styles from './VerticalCarousel.module.css'


const VerticalCarousel = () => {
    const [index, setIndex] = useState(0);
    const [ animateParent ] = useAutoAnimate()

    return (
        <>
            <Container maxWidth={'xl'} ref={animateParent}
                       sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',height:'80%'}}>
                <Box className={styles.Card} key={index}>
                    <Typography textAlign={'center'} variant={'h1'}>{ProjectContent[index].title}</Typography>
                    <Typography textAlign={'center'} variant={'h6'}>{ProjectContent[index].subTitle}</Typography>
                    <ul style={{marginTop: '3rem'}}>
                        {ProjectContent[index].description.map((desc, i) => (
                            <React.Fragment key={i}>
                                <li>
                                    <ListItemText primary={desc}/>
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                    <Typography marginTop={5} fontWeight={600} variant={'h6'}>Tech Stack:</Typography>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>

                        {
                            ProjectContent[index].techStack.map((tech, i) => (
                                <span key={i} className={styles.techPill}>{tech}</span>
                            ))
                        }
                    </div>
                    <Button variant={'contained'} sx={{
                        background:'beige',
                        color:'black',
                        ":hover": {
                            background: '#292929',
                            color: 'beige'
                        },
                        fontWeight:600,
                        marginTop: 5,
                        ":focus": {
                            outline: "none"
                        }
                    }} href={ProjectContent[index].projectLink} target={'_blank'}>View Source Code</Button>
                </Box>
            </Container>
            <Box>
                <Button sx={{
                    ":focus": {
                        outline: "none"
                    }
                }} onClick={() => setIndex(index - 1)} disabled={index === 0}>Previous</Button>
                <Button sx={{
                    ":focus": {
                        outline: "none"
                    }
                }} onClick={() => setIndex(index + 1)} disabled={index === ProjectContent.length - 1}>Next</Button>
            </Box>
        </>
    );
}

export default VerticalCarousel;