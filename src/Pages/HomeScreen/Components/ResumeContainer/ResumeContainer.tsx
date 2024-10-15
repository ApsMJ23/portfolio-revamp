import { useState } from "react";
import { ResumeContent } from '../../../../assets/Text/ResumeContent.ts';

const ResumeContainer = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <>
            <h1 className="text-center mt-30 mb-10 text-4xl font-bold underline">Work Experience</h1>
            <div className="max-w-7xl mx-auto">
                <div className="space-y-6">
                    {ResumeContent.map((step, index) => (
                        <div key={index}>
                            <div
                                className={`flex items-center cursor-pointer ${activeStep === index ? 'bg-gray-800' : ''}`}
                                onClick={() => setActiveStep(index)}
                            >
                                <img
                                    src={step.iconLink}
                                    alt={'icon'}
                                    className="rounded-full h-8 w-8 bg-white mr-4"
                                />
                                <div>
                                    <h3 className={`text-xl font-bold ${activeStep === index ? 'text-white' : 'text-gray-600'}`}>
                                        {step.company}
                                    </h3>
                                    <p className={`text-lg ${activeStep === index ? 'text-white' : 'text-gray-500'}`}>
                                        {step.designation}
                                    </p>
                                </div>
                            </div>
                            {activeStep === index && (
                                <div className="pl-10 pt-4">
                                    <ul className="list-disc list-inside space-y-2">
                                        {step.roleResponsibilities.map((responsibility, index) => (
                                            <li key={index} className="text-gray-400">
                                                {responsibility}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ResumeContainer;
