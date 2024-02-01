import {Box, Card, Container, Typography} from "@mui/material";
import styles from './ProjectContainer.module.css';
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {ProjectContent} from '../../../../assets/Text/ProjectContent.ts';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAirbnb} from "@fortawesome/free-brands-svg-icons";


const ProjectContainer = () => {
    const [animateParent] = useAutoAnimate()
    const [showDescription,setShowDescription] = useState('');
    return (
        <Container maxWidth={'xl'} sx={{borderRadius:{xs:10,md:'20rem 0 0 20rem'}, marginTop:20,marginLeft:{xs:0,md:10},paddingX:5,paddingY:5,height:700}} className={styles.ProjectContainer}>
            <Container maxWidth={'xl'}>
                <Box display={'flex'} flexDirection={'column'} width={'100%'}  justifyContent={'center'}
                     alignItems={'center'}>
                    <Typography sx={{ fontFamily: "'Fjalla One', sans-serif",textDecoration:'underline'}} variant={'h1'}>Projects</Typography>
                    <Typography sx={{fontSize:20}} marginTop={2} textAlign={'center'} variant={'h3'}>Some of my projects</Typography>
                </Box>
                {
                    ProjectContent.map((project,index)=>{
                            return (
                                <Box key={index} marginLeft={{xs:0,md:20}} overflow={'auto'} marginTop={10} display={'flex'} flexWrap={'wrap'} alignItems={'center'} width={{md:'80%',xs:'100%'}} gap={5}>
                                    <Card onMouseEnter={()=>setShowDescription('hello')} onMouseLeave={()=>setShowDescription('')} ref={animateParent} sx={{width:{xs:'100%',md:300},height:300,background:'#292929',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} variant={'elevation'} elevation={10} >
                                        <FontAwesomeIcon color={'beige'} size={'3x'} icon={faAirbnb} style={{marginBottom:'1rem'}}/>
                                        <Typography sx={{color:'beige'}} variant={'h3'}>{project.title}</Typography>
                                        {showDescription==='hello'&&<Typography sx={{color:'beige'}} marginTop={1} variant={'h6'}>{project.subTitle}</Typography>}
                                    </Card>
                                    <Box width={{xs:'100%',md:600}}>
                                        <Typography>
                                            {project.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        }
                    )}
            </Container>
        </Container>
    );
}

export default ProjectContainer;