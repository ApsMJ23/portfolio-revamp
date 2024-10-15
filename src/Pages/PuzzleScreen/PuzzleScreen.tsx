import styles from './PuzzleScreen.module.css';
import Greetings from '../../assets/Svg/greetings.svg';
import { useEffect, useState } from "react";
import CodeBlockComponent from "./Components/CodeBlock/CodeBlockComponent.tsx";
import { QuestionType } from "../../assets/Text/PuzzleList.ts";
import { useSearchParams } from "react-router-dom";
import Result from "./Components/Result/Result.tsx";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const PuzzleScreen = () => {
    const [params, setParams] = useSearchParams();
    const [animationParent] = useAutoAnimate();
    const [showResult, setShowResult] = useState(false);
    const [selectedPuzzle, setSelectedPuzzle] = useState<QuestionType>({
        Code: '',
        Options: [],
        Answer: ''
    });

    useEffect(() => {
        if (params.get('question')) {
            setShowResult(true);
        }
    }, [params]);

    const checkWhetherCorrect = (value: string) => {
        if (value === selectedPuzzle.Answer) {
            params.set('question', 'true');
        } else {
            params.set('question', 'false');
        }
        setShowResult(true);
        setParams(params);
    };

    return (
        <div ref={animationParent} className="flex w-full max-w-7xl mx-auto p-4">
            {showResult ? (
                <Result setShowResult={setShowResult} />
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3 lg:w-1/2 relative">
                    <h4 className="text-center text-black text-2xl font-bold mb-6">
                        Brace yourself! This place is like a VIP club. Are you on the guest list or just hoping for a virtual bouncer to give you the nod?
                    </h4>
                    <div className="flex flex-col md:flex-row items-center gap-5 overflow-auto">
                        <div className="w-full max-w-xl md:ml-6">
                            <CodeBlockComponent setPuzzleOptions={setSelectedPuzzle} />
                        </div>
                        <div className="h-full w-px bg-gray-200 mx-4 hidden md:block"></div>
                        <div className="flex flex-col items-start space-y-4 w-full">
                            <h5 className="text-center text-black text-lg font-medium">
                                Select the correct output
                            </h5>
                            <div ref={animationParent}>
                                {selectedPuzzle?.Options?.map((option, index) => (
                                    <label key={index} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="radio-buttons-group"
                                            value={option}
                                            onChange={(e) => checkWhetherCorrect(e.target.value)}
                                            className="text-black focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-black">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <img src={Greetings} className={styles.GreetingsImage} alt="bannerImg" />
                </div>
            )}
        </div>
    );
};

export default PuzzleScreen;
