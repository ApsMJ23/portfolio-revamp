import styles from "../../PuzzleScreen.module.css";
import {Box, Button, Paper, Typography} from "@mui/material";
import Bouncer from "../../../../assets/PNG/bouncer.png";
import {Player} from "@lottiefiles/react-lottie-player";
import CrossAnimation from '../../../../assets/Animations/CrossAnimation.json'
import TickAnimation from '../../../../assets/Animations/TickAnimation.json'
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";


type ResultProps = {
    setShowResult:React.Dispatch<React.SetStateAction<boolean>>
}

const Result = (props:ResultProps)=>{
    const {setShowResult} = props;
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [resultAttributes,setResultAttributes] = useState({
        message:'',
        animation:{},
        button1:'',
        button2:'',
    })
    useEffect(() => {
        if(params.get('question') === 'true'){
            setResultAttributes({
                message:'The Bouncer Says, Welcome to the Club!',
                animation:TickAnimation,
                button1:'Play Again',
                button2:'Enter the Club'
            })
        }else{
            setResultAttributes({
                message:'The Bouncer Says, Stag Entry Not Allowed :(',
                animation:CrossAnimation,
                button1:'Try Again',
                button2:'Bribe Him'
            })
        }
    }, [params]);
    const handleReplay = ()=>{
        navigate('/questions')
        setShowResult(false)
    }
    return(
        <Paper sx={{
            paddingX: 2,
            display:'flex',
            flexDirection:'column',
            paddingY: 5,
            borderRadius: 4,
            position: 'relative',
            width: {sm: '70%', lg: '50%'}
        }}
               className={styles.PuzzleContainer} square={false} elevation={10}>
            <Typography textAlign={'center'} color={'black'} variant={'h4'} fontSize={{sx: '1rem', lg: '2rem'}}
                        fontWeight={600}>
                {resultAttributes.message}
            </Typography>
            <Box marginTop={10}>
                <Player src={params.get('question') === 'true'?TickAnimation:CrossAnimation} autoplay={true} loop={true} style={{height:'300px',width:'300px'}}/>
            </Box>
            <Box display={'flex'} width={'50%'} flexWrap={'wrap'} marginTop={'auto'} gap={{xs:1,md:5}}>
                <Button onClick={handleReplay} variant={'contained'} color={'primary'} >{resultAttributes.button1}</Button>
                <Button sx={{whiteSpace:'nowrap'}} variant={'contained'} color={'secondary'}>{resultAttributes.button2}</Button>
            </Box>
            <img src={Bouncer} className={styles.BouncerImage} alt={'Bouncer'}/>
        </Paper>
    )
}

export default Result;