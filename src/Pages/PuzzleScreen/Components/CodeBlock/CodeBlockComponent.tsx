import { PuzzleList, QuestionType } from "@/assets/Text/PuzzleList.ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

type CodeBlockComponentProps = {
    setPuzzleOptions: Dispatch<SetStateAction<QuestionType>>
}

const CodeBlockComponent = (props: CodeBlockComponentProps) => {
    const { setPuzzleOptions } = props;
    const randomKey = Object.keys(PuzzleList)[Math.floor(Math.random() * Object.keys(PuzzleList).length)];
    const [selectedLanguage, setSelectedLanguage] = useState(randomKey);
    const randomPuzzle = Math.floor(Math.random() * PuzzleList[selectedLanguage].length);
    const [puzzle, setPuzzle] = useState(PuzzleList?.[selectedLanguage]?.[randomPuzzle] ?? PuzzleList[selectedLanguage][0]);

    useEffect(() => {
        setPuzzle(PuzzleList?.[selectedLanguage]?.[randomPuzzle] ?? PuzzleList[selectedLanguage][0]);
        setPuzzleOptions(puzzle ?? PuzzleList[selectedLanguage][0]);
    }, [randomPuzzle, selectedLanguage, puzzle?.Options, setPuzzleOptions, puzzle]);

    return (
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
            <div className="w-full mb-4">
                <label htmlFor="language-selector" className="block text-sm font-medium text-gray-700">
                    Select a language
                </label>
                <select
                    id="language-selector"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    {Object.keys(PuzzleList).map((language, index) => (
                        <option key={index} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-72 h-56">
                <CodeBlock
                    text={puzzle.Code}
                    codeContainerStyle={{ width: '100%', borderRadius: '0.5rem' }}
                    language={selectedLanguage}
                    startingLineNumber={1}
                    showLineNumbers={false}
                    theme={dracula}
                />
            </div>
        </div>
    );
};

export default CodeBlockComponent;
