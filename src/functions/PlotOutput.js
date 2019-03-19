import React from 'react';

export default function PlotOutput(props){
    return (
        <div>
            <div className="container plotoutput_container">
                <h3 class="title is-3">Generated Plot: {props.allObjects[3].title}</h3>
                <p>{props.allObjects[3].opening_crawl}</p>
                <br/>
                <p>{
                    "So " +
                    props.allObjects[0].name
                    + " and " + 
                    props.allObjects[1].name
                    + " are flying to planet " +
                    props.allObjects[2].name
                    + " to prepare for an epic battle."
                    }</p>
            </div>

            <ul>Used Resources:
                <li className="used_resources">Character1: <a href={props.allObjects[0].url}>{props.allObjects[0].url}</a></li>
                <li className="used_resources">Character2: <a href={props.allObjects[1].url}>{props.allObjects[1].url}</a></li>
                <li className="used_resources">Planet: <a href={props.allObjects[2].url}>{props.allObjects[2].url}</a></li>
                <li className="used_resources">Film: <a href={props.allObjects[3].url}>{props.allObjects[3].url}</a></li>
            </ul>
        </div>
    );
}