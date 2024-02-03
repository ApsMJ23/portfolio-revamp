import {Button} from "@mui/material";


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__container__left">
                    <h1>Let's work together</h1>
                    <p>Feel free to reach out to me for any project or collaboration</p>
                </div>
                <div className="footer__container__right">
                    <a href="mailto:apurvsiingh@gmail.com">
                        <Button variant="contained" color="primary">Contact Me</Button>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;