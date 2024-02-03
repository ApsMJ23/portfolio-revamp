import {Paper, Typography} from "@mui/material";
import moment from "moment";


const Footer = () => {
    // This component is the footer of the home screen
    return (
        <Paper elevation={15} sx={{background:'#333',position:'relative',zIndex:10}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:20}}>
                <Typography variant={'h6'}>© {moment().format('YYYY')}</Typography>
                <Typography variant={'h6'}>Made with ❤️ by <a href={'https://www.linkedin.com/in/apsmj23/'} target='_blank'>Apurv Singh</a></Typography>
            </div>
        </Paper>
    );
}

export default Footer;