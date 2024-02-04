import {Box, Button, Container, Typography} from "@mui/material";
import {ProjectContent} from '../../../../../../assets/Text/ProjectContent.ts';
import {useState} from "react";
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
                    <Typography variant={'h1'}>{ProjectContent[index].title}</Typography>
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