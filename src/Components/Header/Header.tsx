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
                        <Typography
                            variant={'h6'}
                            noWrap
                            sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }} >Apurv Singh</Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Header;