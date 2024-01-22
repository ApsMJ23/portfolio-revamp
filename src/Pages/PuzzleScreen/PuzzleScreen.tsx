import styles from './PuzzleScreen.module.css'
import {Box, Container, Divider, FormControlLabel, Paper, Radio, RadioGroup, Typography} from "@mui/material";
import Greetings from '../../assets/Svg/greetings.svg'
import {useState} from "react";
import CodeBlockComponent from "./Components/CodeBlock/CodeBlockComponent.tsx";

const PuzzleScreen = () => {
    const [puzzleOptions,setPuzzleOptions] = useState<string[]>([]);
    return (
        <Container sx={{display: 'flex'}} maxWidth={'xl'} className={styles.PuzzleWrapper}>
            <Paper sx={{paddingX: 2,paddingY:5, borderRadius: 4, position: 'relative', width: {sm: '70%', lg: '50%'}}}
                   className={styles.PuzzleContainer} square={false} elevation={10}>
                <Typography textAlign={'center'} color={'black'} variant={'h4'} fontSize={{sx:'1rem',lg:'2rem'}} fontWeight={600}>Brace yourself! This place is like a VIP club. Are you on the guest list or just hoping for a virtual bouncer to give you the nod?</Typography>
                <Box height={{xs:250,md:'auto'}} marginTop={5} overflow={'auto'} justifyContent={'space-evenly'} display={'flex'} gap={5} alignItems={'center'} flexDirection={{xs:'column',md:'row',lg:'row'}}>
                    <Box marginTop={{xs:45, md:0}} maxWidth={'xl'} marginLeft={{md:6}}>
                        <CodeBlockComponent setPuzzleOptions={setPuzzleOptions}/>
                    </Box>
                    <Divider orientation={'vertical'} flexItem={true} variant={'fullWidth'} color={'primary'} />
                    <Box>
                        <Typography textAlign={'center'} marginBottom={3} color={'black'} variant={'h5'} fontWeight={400}>Select the correct output</Typography>
                        <RadioGroup
                            name="radio-buttons-group"
                        >
                            {puzzleOptions.map((option,index) => (
                                <FormControlLabel key={index} value={option} control={<Radio />} label={option} labelPlacement={'end'} sx={{color:'black'}} />
                            ))}
                        </RadioGroup>
                    </Box>
                </Box>
                <img src={Greetings} className={styles.GreetingsImage} alt={'bannerImg'}/>
            </Paper>
        </Container>
    )
}

export default PuzzleScreen