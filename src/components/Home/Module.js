import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Module = ({ module, showDialog, index }) => {
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
                    style={{ background: index % 2 === 0 ? BLUE : MID_BLUE }}>
                    {module.button}
                </button>
            </div>

            <div>
                <img src={module.image} />
            </div>
        </section>
    )
};

export default Module;