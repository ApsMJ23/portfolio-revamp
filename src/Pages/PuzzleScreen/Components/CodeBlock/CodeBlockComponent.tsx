import {PuzzleList} from "../../../../assets/Text/PuzzleList.ts";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {CodeBlock, dracula} from "react-code-blocks";


type CodeBlockComponentProps={
    setPuzzleOptions:Dispatch<SetStateAction<string[]>>
}

const CodeBlockComponent=(props:CodeBlockComponentProps)=>{
    const {setPuzzleOptions} = props;
    const randomKey = Object.keys(PuzzleList)[Math.floor(Math.random() * Object.keys(PuzzleList).length)]
    const [selectedLanguage,setSelectedLanguage] = useState(randomKey);
    const randomPuzzle = Math.floor(Math.random() * PuzzleList[selectedLanguage].length)
    const [puzzle,setPuzzle] = useState(PuzzleList?.[selectedLanguage]?.[randomPuzzle]??PuzzleList[selectedLanguage][0])
    useEffect(() => {
        setPuzzle(PuzzleList?.[selectedLanguage]?.[randomPuzzle]??PuzzleList[selectedLanguage][0])
        setPuzzleOptions(puzzle.Options??[])
    }, [randomPuzzle,selectedLanguage,puzzle.Options]);
    return(
        <Box display={{xs:'flex'}} flexDirection={{xs:'column'}} alignItems={{xs:'center'}}  sx={{width: {xs: '90%', lg: '20rem'}}}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
            <InputLabel id="language-selector">Select A language</InputLabel>
            <Select

                labelId="demo-simple-select-label"
                id="language-selector"
                sx={{color:'black',marginBottom:'1rem',width:'100%',borderRadius:'5rem'}}
                value={selectedLanguage}
                onChange={(e)=>setSelectedLanguage(e.target.value)}
            >
                {Object.keys(PuzzleList).map((language,index) => (
                    <MenuItem sx={{color:'black'}} key={index} value={language}>{language}</MenuItem>
                ))}
            </Select>
            </FormControl>
            <CodeBlock
                text={puzzle.Code}
                codeContainerStyle={{width: '100%',borderRadius:'5rem'}}
                language={selectedLanguage}
                startingLineNumber={1}
                showLineNumbers={false}
                theme={dracula}
            />
        </Box>
    )

}

export default CodeBlockComponent;