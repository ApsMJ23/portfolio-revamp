export const ProjectContent = [
    {
        title: "Vruoom CRM Frontend",
        subTitle: "CRM App managing more than 50 Fuel stations.",
        description:[
            "Supports real time updates across all the users using REST Apis",
            "Uses Django Token authentication for authentication and authorization purposes.",
            "Redux Saga is used for efficient api calls and global stage management",
            "There is RBAC (Role Based Access Control) giving the admin more control over the data being shown",
        ],
        techStack:["ReactJs","Redux","Typescript","SCSS","REST Api"],
        projectLink:"https://github.com/ApsMJ23/vruoom_frontend"
    },
    {
        title: "Vruoom CRM Backend ",
        subTitle: "Microservice based monolithic architecture, django rest framework backend service",
        description:[
            "Authentication service is a totally independent module, easily pluggable to any frontend and good to go!!",
            "RBAC module allows the user to give out different data to different users based on their roles",
            "The roles are also customisable and we can add and remove them through the admin panel",
            "The app uses django rest framework to send and receive requests and response"
        ],
        techStack: ["Django","Python","Django Rest Framework","SQLite"],
        projectLink: "https://github.com/ApsMJ23/vruoom_backend"
    },
]