import moment from "moment";


const Footer = () => {
    // This component is the footer of the home screen
    return (
        <div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:20}}>
                <h6>© {moment().format('YYYY')}</h6>
                <h6>Made with ❤️ by <a href={'https://www.linkedin.com/in/apsmj23/'} target='_blank'>Apurv Singh</a></h6>
            </div>
        </div>
    );
}

export default Footer;