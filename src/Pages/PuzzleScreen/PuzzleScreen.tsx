import styles from './PuzzleScreen.module.css'
import {Box, Container, Divider, FormControlLabel, Paper, Radio, RadioGroup, Typography} from "@mui/material";
import Greetings from '../../assets/Svg/greetings.svg'
import {useEffect, useState} from "react";
import CodeBlockComponent from "./Components/CodeBlock/CodeBlockComponent.tsx";
import {QuestionType} from "../../assets/Text/PuzzleList.ts";
import {useSearchParams} from "react-router-dom";
import Result from "./Components/Result/Result.tsx";
import {useAutoAnimate} from "@formkit/auto-animate/react";

const PuzzleScreen = () => {
    const [params, setParams] = useSearchParams();
    const [animationParent] = useAutoAnimate()
    const [showResult, setShowResult] = useState(false);
    const [selectedPuzzle, setSelectedPuzzle] = useState<QuestionType>({
        Code: '',
        Options: [],
        Answer: ''
    });
    useEffect(() => {
        if(params.get('question')){
            setShowResult(true)
        }
    }, [params]);
    const checkWhetherCorrect = (value: string) => {
        if (value === selectedPuzzle.Answer) {
            params.set('question', 'true')
        } else {
            params.set('question', 'false')
        }
        setShowResult(true);
        setParams(params)
    }
    return (
        <Container ref={animationParent} sx={{display: 'flex'}} maxWidth={'xl'} className={styles.PuzzleWrapper}>
            {showResult ? <Result setShowResult={setShowResult}/>
                :
                <Paper sx={{
                    paddingX: 2,
                    paddingY: 5,
                    borderRadius: 4,
                    position: 'relative',
                    width: {sm: '70%', lg: '50%'}
                }}
                       className={styles.PuzzleContainer} square={false} elevation={10}>
                    <Typography textAlign={'center'} color={'black'} variant={'h4'} fontSize={{sx: '1rem', lg: '2rem'}}
                                fontWeight={600}>Brace yourself! This place is like a VIP club. Are you on the guest
                        list or just hoping for a virtual bouncer to give you the nod?</Typography>
                    <Box height={{xs: 250, md: 'auto'}} marginTop={5} overflow={'auto'} justifyContent={'space-evenly'}
                         display={'flex'} gap={5} alignItems={'center'}
                         flexDirection={{xs: 'column', md: 'row', lg: 'row'}}>
                        <Box marginTop={{xs: 45, md: 0}} maxWidth={'xl'} marginLeft={{md: 6}}>
                            <CodeBlockComponent setPuzzleOptions={setSelectedPuzzle}/>
                        </Box>
                        <Divider orientation={'vertical'} flexItem={true} variant={'fullWidth'} color={'primary'}/>
                        <Box  display={'flex'} flexDirection={'column'} alignItems={'flex-start'} height={220}
                             width={300}>
                            <Typography textAlign={'center'} marginBottom={3} color={'black'} variant={'h5'}
                                        fontWeight={400}>Select the correct output</Typography>
                            <RadioGroup
                                ref={animationParent}
                                name="radio-buttons-group"
                                onChange={(e) => checkWhetherCorrect(e.target.value)}
                            >
                                {selectedPuzzle?.Options?.map((option, index) => (
                                    <FormControlLabel id={option} key={index} value={option} control={<Radio/>}
                                                      label={option} labelPlacement={'end'} sx={{color: 'black'}}/>
                                ))}
                            </RadioGroup>
                        </Box>
                    </Box>
                    <img src={Greetings} className={styles.GreetingsImage} alt={'bannerImg'}/>
                </Paper>
            }
        </Container>
    )
}

export default PuzzleScreen