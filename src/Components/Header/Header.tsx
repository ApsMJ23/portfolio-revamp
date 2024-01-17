import {AppBar, Container, Toolbar, Typography, useScrollTrigger} from "@mui/material";
import CodeOffIcon from '@mui/icons-material/CodeOff';

const Header = () => {
    const trigger = useScrollTrigger({disableHysteresis: true, threshold: 100});
    return (
        <>
            <AppBar elevation={trigger ? 10 : 0} color={trigger ? 'primary' : 'transparent'} position={'fixed'}>
                <Container maxWidth={'xl'}>
                    <Toolbar disableGutters>
                        <CodeOffIcon sx={{fontSize: '2rem',marginRight:'1.5rem'}}/>
                        <Typography >Apurv Singh</Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Header;