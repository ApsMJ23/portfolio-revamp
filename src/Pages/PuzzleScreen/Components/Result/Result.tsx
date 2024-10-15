import styles from "../../PuzzleScreen.module.css";
import Bouncer from '../../../../assets/PNG/Bouncer.png';
import { Player } from "@lottiefiles/react-lottie-player";
import CrossAnimation from '../../../../assets/Animations/CrossAnimation.json';
import TickAnimation from '../../../../assets/Animations/TickAnimation.json';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

type ResultProps = {
    setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const Result = (props: ResultProps) => {
    const { setShowResult } = props;
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [resultAttributes, setResultAttributes] = useState({
        message: '',
        animation: {},
        button1: '',
        button2: '',
    });

    useEffect(() => {
        if (params.get('question') === 'true') {
            setResultAttributes({
                message: 'The Bouncer Says, Welcome to the Club!',
                animation: TickAnimation,
                button1: 'Play Again',
                button2: 'Enter the Club'
            });
        } else {
            setResultAttributes({
                message: 'The Bouncer Says, Stag Entry Not Allowed :(',
                animation: CrossAnimation,
                button1: 'Try Again',
                button2: 'Bribe Him'
            });
        }
    }, [params]);

    const handleReplay = () => {
        navigate('/questions');
        setShowResult(false);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3 lg:w-1/2 relative mx-auto flex flex-col items-center">
            <h4 className="text-center text-black text-2xl font-bold mb-6">
                {resultAttributes.message}
            </h4>
            <div className="mt-10">
                <Player
                    src={params.get('question') === 'true' ? TickAnimation : CrossAnimation}
                    autoplay={true}
                    loop={true}
                    style={{ height: '300px', width: '300px' }}
                />
            </div>
            <div className="flex flex-wrap gap-4 mt-auto w-1/2 justify-center">
                <button
                    onClick={handleReplay}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {resultAttributes.button1}
                </button>
                <button
                    onClick={() => navigate('/home')}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 whitespace-nowrap"
                >
                    {resultAttributes.button2}
                </button>
            </div>
            <img src={Bouncer} className={styles.BouncerImage} alt="Bouncer" />
        </div>
    );
}

export default Result;
