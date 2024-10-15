import {ProjectContent} from '@/assets/Text/ProjectContent.ts';
import React, {useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import styles from './VerticalCarousel.module.css'


const VerticalCarousel = () => {
    const [index, setIndex] = useState(0);
    const [ animateParent ] = useAutoAnimate()

    return (
        <>
            <div ref={animateParent}>
                <div className={styles.Card} key={index}>
                    <h1 >{ProjectContent[index].title}</h1>
                    <h6>{ProjectContent[index].subTitle}</h6>
                    <ul style={{marginTop: '3rem'}}>
                        {ProjectContent[index].description.map((desc, i) => (
                            <React.Fragment key={i}>
                                <li>
                                    <p >{desc}</p>
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                    <h6>Tech Stack:</h6>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>

                        {
                            ProjectContent[index].techStack.map((tech, i) => (
                                <span key={i} className={styles.techPill}>{tech}</span>
                            ))
                        }
                    </div>
                    {/*@todo: add a onClick function here*/}
                    <button>View Source Code</button>
                </div>
            </div>
            <div>
                <button onClick={() => setIndex(index - 1)} disabled={index === 0}>Previous</button>
                <button onClick={() => setIndex(index + 1)} disabled={index === ProjectContent.length - 1}>Next</button>
            </div>
        </>
    );
}

export default VerticalCarousel;