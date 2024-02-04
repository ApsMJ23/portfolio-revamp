import {Box, Container, Typography} from "@mui/material";
import styles from './ProjectContainer.module.css';
import VerticalCarousel from "./Components/VerticalCarousel/VerticalCarousel.tsx";


const ProjectContainer = () => {
    return (
        <Container maxWidth={'xl'} sx={{marginTop:20,paddingX:5,paddingY:5,display:'flex',gap:10}} className={styles.ProjectContainer}>
            <Box position={'sticky'} top={0} display={'flex'} justifyContent={'center'} alignItems={'center'} width={{md:'50%',xs:'100%'}}>
                <Typography variant={'h1'} fontSize={{md:150,xs:40}} fontWeight={600} fontFamily={"'Fjalla One',sans-serif"}>Projects For Everyday</Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={{md:'50%',xs:'100%'}}>
                <VerticalCarousel/>
            </Box>

        </Container>
    );
}

export default ProjectContainer;