type QuestionType = {
    Code:string,
    Answer:string,
    Options:string[]
}


export const PuzzleList:{[key:string]:QuestionType[]} = {
    'C++':[
        {
            Code:"#include<iostream>\nusing namespace std;\nint main() {\n    int x = 5;\n    cout << x++ << \" \" << ++x;\n    return 0;\n}\n",
            Answer:"5 7",
            Options:["5 7","6 7","6 6","5 6"]
        },
    ],
    "Python":[
        {
            Code:"a = [1, 2, 3]\nb = a\nb[0] = 5\nprint(a)\n",
            Answer:"[5, 2, 3]",
            Options:["[5, 2, 3]","[1, 2, 3]","[5, 5, 5]","[1, 5, 3]"]
        },
    ],
    "Java":[
        {
            Code:"public class Test {\n    public static void main(String[] args) {\n        String str = \"Hello\";\n        str.concat(\" World\");\n        System.out.println(str);\n    }\n}\n",
            Answer:"Hello",
            Options:["Hello","Hello World","World","HelloWorld"]
        },
    ],
    "JavaScript":[
        {
            Code:"1 + \"1\"\n",
            Answer:"11",
            Options:["11","2","1","undefined"]
        },
    ],
    "C":[
        {
            Code:"/* Choose The Output from the given \nOptions to enter */\n\n#include<stdio.h>\nint main() {\n    printf(\"%d\", sizeof(\"Hello\"));\n    return 0;\n}\n",
            Answer:"6",
            Options:["6","5","4","7"]
        }
    ]
}