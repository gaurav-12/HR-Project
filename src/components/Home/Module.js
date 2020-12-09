import React from 'react';

const Module = ({ module, showDialog, index, userType }) => {
    const MID_BLUE = 'rgb(0, 81, 115)';
    const BLUE = 'rgb(13, 103, 141)';

    return (
        <section className="sections" style={{ background: index % 2 === 0 ? MID_BLUE : BLUE }}>
            <div>
                <h2>{module.title}</h2>
                <p>
                    {module.description}
                </p>

                <button onClick={() => showDialog()}
                    style={{ background: index % 2 === 0 ? BLUE : MID_BLUE }}
                    hidden={userType === "ADMIN"}>
                    {module.button}
                </button>
            </div>

            <div>
                <img src={module.image} alt={module.title}/>
            </div>
        </section>
    )
};

export default Module;