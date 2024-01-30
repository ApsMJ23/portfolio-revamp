import {Box, Card, CardContent, CardHeader, Container, Typography} from "@mui/material";
import styles from './ProjectContainer.module.css';


const ProjectContainer = () => {
    return (
        <div className={styles.ProjectContainer}>
            <Container maxWidth={'xl'}>
                <Box display={'flex'} flexDirection={'column'} width={'100%'} marginTop={20} justifyContent={'center'}
                     alignItems={'center'}>
                    <Typography sx={{ fontFamily: "'Fjalla One', sans-serif",textDecoration:'underline'}} variant={'h1'}>Projects</Typography>
                    <Typography sx={{fontSize:20}} marginTop={2} textAlign={'center'} variant={'h3'}>Some of my projects</Typography>
                </Box>
                <Box marginTop={10} display={'flex'} alignItems={'center'} gap={5}>
                    <Card square={false} variant={'elevation'} elevation={10} sx={{width: {xs: '100%', md: '30%'}, height: {xs: '100%', md: '100%'},background:'#444'}}>
                        <CardHeader title={'Airbnb Clone'} titleTypographyProps={{variant:'h3',fontWeight:600,textAlign:'center'}} sx={{background:'#6e5494'}}/>
                        <img src="https://cdn.freebiesupply.com/images/large/2x/airbnb-logo.png" alt="airbnb" style={{width:'100%',height:'100%'}}/>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                This is a project
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </div>
    );
}

export default ProjectContainer;