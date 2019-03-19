import React from 'react';
import axios from 'axios';
import SelectPlotResources from './SelectPlotResources';
import PlotOutput from './functions/PlotOutput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import WaitingForValueSelect from './functions/WaitingForValuesSelect';

export default class PlotGenerator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            char1search: '',
            char2search: '',
            planetsearch: '',
            char1SearchResult: [],
            char2SearchResult: [],
            planetSearchResult: [],
            randomFilmResult: [],
            char1Url: '',
            char2Url: '',
            planetUrl: '',
            updateKey: 0,
            updateFilm: 0,
            updateSelectChar1: 0,
            updateSelectChar2: 0,
            updateSelectPlanet: 0,
            showNotification: 0,
            showNotificationWarning: 0,
        };
        this.handleCharValueChange = this.handleCharValueChange.bind(this);
    }

    setCharSearch(e, searchstate) {
        this.setState({
            [searchstate]: e.target.value
        });
    }

    searchChar(searchresultstate, typesearch) {

        if(typesearch.length > 0)
        {
        let resourceType = typesearch === this.state.planetsearch ? "planets" : "people";

        axios.get('https://swapi.co/api/' + resourceType + '/?search=' + typesearch)
            .then(response => {
                console.log(response.data);
                this.setState({ [searchresultstate]: response.data,
                                 updateKey: 0,
                                 showNotificationWarning: response.data.count === 0 ? 1 : 0,
                                });
                searchresultstate === "char1SearchResult" ? this.setState({updateSelectChar1: Math.random()}) : console.log();
                searchresultstate === "char2SearchResult" ? this.setState({updateSelectChar2: Math.random()}) : console.log();
                searchresultstate === "planetSearchResult" ? this.setState({updateSelectPlanet: Math.random()}) : console.log();
            })
            .catch(error => {
                console.log(error);
            });
        }
        else{
            this.setState({showNotification: 1});
        }
    }
        showChar1Select()
        {
            return <SelectPlotResources searches={this.state.char1SearchResult}
            onSelectChange={this.handleCharValueChange} type="char1Url" 
            key={this.state.updateSelectChar1} />
        }
        showChar2Select()
        {
            return <SelectPlotResources searches={this.state.char2SearchResult}
            onSelectChange={this.handleCharValueChange} type="char2Url" 
            key={this.state.updateSelectChar2} />
        }
        showPlanetSelect()
        {
            return <SelectPlotResources searches={this.state.planetSearchResult}
            onSelectChange={this.handleCharValueChange} type="planetUrl" 
            key={this.state.updateSelectPlanet} />
        }


    waitForValues() {
        return <WaitingForValueSelect/>
    }

    handleCharValueChange(selectedURL, typeUrl) {
        this.setState({
            [typeUrl]: selectedURL
        });
    }

    getRandomAttributes() {
        if (this.state.updateFilm === 0) {
            const randomfilm = 1 + Math.floor(Math.random() * 7);
            axios.get('https://swapi.co/api/films/' + randomfilm,
                {
                }).then(response => {
                    this.setState({
                        randomFilmResult: response.data,
                        updateFilm: 1
                    });
                }).catch(error => {
                    console.log(error);
                });
        }
    }
    grabUsedObjects() {
        let char1obj;
        let char2obj;
        let planetobj;
        this.state.char1SearchResult.results.map((resource) => {
            resource.url === this.state.char1Url ? char1obj = resource : console.log()
        })

        this.state.char2SearchResult.results.map((resource) => {
            resource.url === this.state.char2Url ? char2obj = resource : console.log()
        })

        this.state.planetSearchResult.results.map((resource) => {
            resource.url === this.state.planetUrl ? planetobj = resource : console.log()
        })

        const allObjects = [char1obj, char2obj, planetobj, this.state.randomFilmResult];

        return allObjects;
    }

    generatePlot() {
        if (this.state.char1Url !== '' && this.state.char2Url !== '' && this.state.planetUrl !== '') {
            this.getRandomAttributes();
            const allObjects = this.grabUsedObjects();
            return <PlotOutput allObjects={allObjects}/>
        }
    }

    genBtnClicked() {
        if(this.state.char1SearchResult.count > 0 && this.state.char2SearchResult.count > 0 && this.state.planetSearchResult.count > 0)
        {
            this.setState({
                updateFilm: 0,
                updateKey: Math.random()
            })
        }
    }

    render() {
        return (
            <div className="hero-body">
                <form>
                <div className="notification is-danger" style={{display: this.state.showNotification ? 'block' : 'none'}}>
                    <button className="delete" type="button" onClick={() => this.setState({showNotification: 0})} />
                    please fill the input field with <strong>atleast one letter</strong> before searching for characters!
                </div>
                <div className="notification is-warning" style={{display: this.state.showNotificationWarning ? 'block' : 'none'}}>
                    <button className="delete" type="button" onClick={() => this.setState({showNotificationWarning: 0})} />
                    <strong>no characters found</strong> please try to search for something else.
                </div>
                    <div className="columns">
                        <div className="field column is-one-third">
                            <label className="label">Character 1</label>
                            <div className="control columns">
                                <input className="input column" type="text" value={this.state.char1search} placeholder="search character" onChange={(e) => this.setCharSearch(e, "char1search")}></input>
                                <button className="button column is-one-fifth search_btn" type="button"
                                    onClick={() => this.searchChar("char1SearchResult", this.state.char1search)}>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </button>
                            </div>
                            {    this.state.char1SearchResult.count > 0 ? this.showChar1Select("char1Url") : this.waitForValues()
                            }
                        </div>

                        <div className="field column is-one-third">
                            <label className="label">Character 2</label>
                            <div className="control columns">
                                <input className="input column" type="text" value={this.state.char2search} placeholder="search character" onChange={(e) => this.setCharSearch(e, "char2search")}></input>
                                <button className="button column is-one-fifth search_btn" type="button" 
                                onClick={() => this.searchChar("char2SearchResult", this.state.char2search)}>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </button>
                            </div>
                            {
                                this.state.char2SearchResult.count > 0 ? this.showChar2Select("char2Url") : this.waitForValues()
                            }
                        </div>

                        <div className="field column is-one-third">
                            <label className="label">Planet</label>
                            <div className="control columns">
                                <input className="input column" type="text" value={this.state.planetsearch} placeholder="search planets" onChange={(e) => this.setCharSearch(e, "planetsearch")}></input>
                                <button className="button column is-one-fifth search_btn" type="button" 
                                onClick={() => this.searchChar("planetSearchResult", this.state.planetsearch)}>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </button>
                            </div>
                            {
                                this.state.planetSearchResult.count > 0 ? this.showPlanetSelect("planetUrl") : this.waitForValues()
                            }
                        </div>
                    </div>
                </form>

                <button type="button" className="button is-rounded generate_btn" 
                onClick={() => this.genBtnClicked()}>{this.state.updateKey > 0 ? "New Plot" : "Generate a Plot"}</button>
                {
                    this.state.updateKey > 0 ? this.generatePlot() : console.log()
                }
            </div>
        );
    }
}