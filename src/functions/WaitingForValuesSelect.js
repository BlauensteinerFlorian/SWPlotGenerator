import React from 'react';

export default function WaitingForValueSelect(){
    return (
        <div className="control">
            <div className="select is-loading select_resources">
                <select disabled>
                    <option>waiting for input!</option>
                </select>
            </div>
        </div>
    );
}