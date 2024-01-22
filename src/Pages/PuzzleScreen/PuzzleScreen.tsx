import styles from './PuzzleScreen.module.css'
import {Box, Container, Divider, FormControlLabel, Paper, Radio, RadioGroup, Typography} from "@mui/material";
import Greetings from '../../assets/Svg/greetings.svg'
import {CodeBlock, dracula} from "react-code-blocks";
import {PuzzleList} from "../../assets/Text/PuzzleList.ts";
import {useEffect, useState} from "react";

const PuzzleScreen = () => {
    // @todo: Add a way to select a puzzle from the list and Convert the code block part into a separate component
    const randomKey = Object.keys(PuzzleList)[Math.floor(Math.random() * Object.keys(PuzzleList).length)]
    const randomPuzzle = Math.floor(Math.random() * PuzzleList[randomKey].length)
    const [puzzle,setPuzzle] = useState(PuzzleList?.[randomKey]?.[randomPuzzle]??PuzzleList[randomKey][0])
    useEffect(() => {
        setPuzzle(PuzzleList?.[randomKey]?.[randomPuzzle]??PuzzleList[randomKey][0])
    }, [randomPuzzle,randomKey]);
    return (
        <Container sx={{display: 'flex'}} maxWidth={'xl'} className={styles.PuzzleWrapper}>
            <Paper sx={{padding: 2, borderRadius: 4, position: 'relative', width: {sx: '70%', lg: '50%'}}}
                   className={styles.PuzzleContainer} square={false} elevation={10}>
                <Typography textAlign={'center'} color={'black'} variant={'h4'} fontWeight={600}>Brace yourself! This place is like a VIP club. Are you on the guest list or just hoping for a virtual bouncer to give you the nod?</Typography>
                <Box marginTop={5} justifyContent={'space-evenly'} display={'flex'} gap={5} alignItems={'center'}>
                    <Box maxWidth={'xl'} marginLeft={5}>
                        <Typography textAlign={'center'} marginBottom={2} color={'black'} variant={'h6'} fontWeight={600}>{randomKey}</Typography>
                        <CodeBlock
                            codeBlockStyle={{width: '100%',borderRadius:'5rem'}}
                            text={puzzle.Code}
                            codeContainerStyle={{width: '100%',borderRadius:'5rem'}}
                            language={randomKey}
                            startingLineNumber={1}
                            showLineNumbers={true}
                            theme={dracula}
                        />
                    </Box>
                    <Divider orientation={'vertical'} flexItem={true} variant={'fullWidth'} color={'primary'} />
                    <Box>
                        <RadioGroup
                            name="radio-buttons-group"
                        >
                            {puzzle.Options.map((option,index) => (
                                <FormControlLabel key={index} value={option} control={<Radio />} label={option} labelPlacement={'end'} sx={{color:'black'}} />
                            ))}
                        </RadioGroup>
                    </Box>
                </Box>
                <img src={Greetings} className={styles.GreetingsImage}/>
            </Paper>
        </Container>
    )
}

export default PuzzleScreen