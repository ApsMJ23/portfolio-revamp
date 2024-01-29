import {
    Container,
    List,
    ListItem,
    ListItemText,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography
} from "@mui/material";
import {useState} from "react";
import {ResumeContent} from '../../../../assets/Text/ResumeContent.ts'


const ResumeContainer = () => {
    const [activeStep, setActiveStep] = useState(0);
    return (
        <>
            <Typography fontWeight={700} variant={'h1'}
                        sx={{textAlign: 'center', marginTop: 30, marginBottom: 10, textDecoration: 'underline'}}>Work
                Experience</Typography>
            <Container>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {ResumeContent.map((step, index) => (
                        <Step key={index}>
                            <StepLabel
                                icon={<img src={step.iconLink} alt={'icon'} style={{
                                    borderRadius: '50%',
                                    height: '2rem',
                                    width: '2rem',
                                    background: 'white'
                                }}/>}
                                sx={{cursor: 'pointer'}}
                                onClick={() => setActiveStep(index)}
                            >
                                <Typography sx={{cursor: 'pointer'}} color={activeStep === index ? 'white' : 'beige'}
                                            variant={'h3'}>{step.company}</Typography>
                                <Typography sx={{cursor: 'pointer'}} fontWeight={500}
                                            color={activeStep === index ? 'white' : 'beige'}>{step.designation}</Typography>
                            </StepLabel>
                            <StepContent>
                                {step.roleResponsibilities.map((responsibility, index) => (
                                    <List sx = {{
                                        listStyleType: 'disc',
                                        pl: {xs:2,md:4},
                                    }} disablePadding={true} key={index}>
                                        <ListItem sx = {{
                                            display: 'list-item',
                                        }} >
                                            <ListItemText >{responsibility}</ListItemText>
                                        </ListItem>
                                    </List>
                                ))
                                }
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Container>
        </>
    )
}

export default ResumeContainer;