import VerticalCarousel from "./Components/VerticalCarousel/VerticalCarousel.tsx";

const ProjectContainer = () => {
    return (
        <div className="max-w-7xl mx-auto mt-20 px-5 py-5 flex flex-wrap md:flex-nowrap gap-10">
            <div className="sticky top-0 flex justify-center items-center w-full md:w-1/2">
                <h1 className="text-center font-bold font-sans text-4xl md:text-[150px]">
                    Freelance Projects
                </h1>
            </div>
            <div className="flex flex-col justify-center items-center w-full md:w-1/2">
                <VerticalCarousel />
            </div>
        </div>
    );
};

export default ProjectContainer;
