import './App.css'
import {Box, Container} from "@mui/material";

function App() {
    return (
        <>
            <Container style={{marginTop:'5rem'}}>
                <Box sx={{ my: 2 }}>
                    {[...new Array(20)]
                        .map(
                            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                        )
                        .join('\n')}
                </Box>
            </Container>
        </>
    )
}

export default App
