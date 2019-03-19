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
            Char1SearchResult: [],
            Char2SearchResult: [],
            PlanetSearchResult: [],
            RandomFilmResult: [],
            char1Url: '',
            char2Url: '',
            planetUrl: '',
            UpdateKey: 0,
            UpdateFilm: 0,
            UpdateSelectChar1: 0,
            UpdateSelectChar2: 0,
            UpdateSelectPlanet: 0,
            showNotification: 0,
            showNotificationWarning: 0,
        };
        this.handleCharValueChange = this.handleCharValueChange.bind(this);
    }

    SetCharSearch(e, searchstate) {
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
                                 UpdateKey: 0,
                                 showNotificationWarning: response.data.count === 0 ? 1 : 0,
                                });
                searchresultstate === "Char1SearchResult" ? this.setState({UpdateSelectChar1: Math.random()}) : console.log();
                searchresultstate === "Char2SearchResult" ? this.setState({UpdateSelectChar2: Math.random()}) : console.log();
                searchresultstate === "PlanetSearchResult" ? this.setState({UpdateSelectPlanet: Math.random()}) : console.log();
            })
            .catch(error => {
                console.log(error);
            });
        }
        else{
            this.setState({showNotification: 1});
        }
    }

    /*    ShowSelect(type) {
            let searchResult;
            if (type === "char1Url") {
                searchResult = this.state.Char1SearchResult;
            }
            else if (type === "char2Url") {
                searchResult = this.state.Char2SearchResult;
            }
            else {
                searchResult = this.state.PlanetSearchResult;
            }
            return <SelectPlotResources searches={searchResult} onSelectChange={this.handleCharValueChange} type={type} />
        }
    */
        ShowChar1Select()
        {
            return <SelectPlotResources searches={this.state.Char1SearchResult}
            onSelectChange={this.handleCharValueChange} type="char1Url" 
            key={this.state.UpdateSelectChar1} />
        }
        ShowChar2Select()
        {
            return <SelectPlotResources searches={this.state.Char2SearchResult}
            onSelectChange={this.handleCharValueChange} type="char2Url" 
            key={this.state.UpdateSelectChar2} />
        }
        ShowPlanetSelect()
        {
            return <SelectPlotResources searches={this.state.PlanetSearchResult}
            onSelectChange={this.handleCharValueChange} type="planetUrl" 
            key={this.state.UpdateSelectPlanet} />
        }


    WaitForValues() {
        return <WaitingForValueSelect/>
    }

    handleCharValueChange(selectedURL, typeUrl) {
        this.setState({
            [typeUrl]: selectedURL
        });
    }

    GetRandomAttributes() {
        if (this.state.UpdateFilm === 0) {
            const randomfilm = 1 + Math.floor(Math.random() * 7);
            axios.get('https://swapi.co/api/films/' + randomfilm,
                {
                }).then(response => {
                    this.setState({
                        RandomFilmResult: response.data,
                        UpdateFilm: 1
                    });
                }).catch(error => {
                    console.log(error);
                });
        }
    }
    GetUsedObjects() {
        let char1obj;
        let char2obj;
        let planetobj;
        this.state.Char1SearchResult.results.map((resource) => {
            resource.url === this.state.char1Url ? char1obj = resource : console.log()
        })

        this.state.Char2SearchResult.results.map((resource) => {
            resource.url === this.state.char2Url ? char2obj = resource : console.log()
        })

        this.state.PlanetSearchResult.results.map((resource) => {
            resource.url === this.state.planetUrl ? planetobj = resource : console.log()
        })

        const allObjects = [char1obj, char2obj, planetobj, this.state.RandomFilmResult];

        return allObjects;
    }

    NoSearchInputNotification()
    {
        return <div id="notification" className="notification is-danger">
        <button className="delete"></button>
        please fill the input field with <strong>atleast one letter</strong> before searching for characters
      </div>
    }

    GeneratePlot() {
        if (this.state.char1Url !== '' && this.state.char2Url !== '' && this.state.planetUrl !== '') {
            this.GetRandomAttributes();
            const allObjects = this.GetUsedObjects();
            return <PlotOutput allObjects={allObjects}/>
        }
    }

    GenBtnClicked() {
        if(this.state.Char1SearchResult.count > 0 && this.state.Char2SearchResult.count > 0 && this.state.PlanetSearchResult.count > 0)
        {
            this.setState({
                UpdateFilm: 0,
                UpdateKey: Math.random()
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
                                <input className="input column" type="text" value={this.state.char1search} placeholder="search character" onChange={(e) => this.SetCharSearch(e, "char1search")}></input>
                                <button className="button column is-one-fifth search_btn" type="button"
                                    onClick={() => this.searchChar("Char1SearchResult", this.state.char1search)}>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </button>
                            </div>
                            {    this.state.Char1SearchResult.count > 0 ? this.ShowChar1Select("char1Url") : this.WaitForValues()
                            }
                        </div>

                        <div className="field column is-one-third">
                            <label className="label">Character 2</label>
                            <div className="control columns">
                                <input className="input column" type="text" value={this.state.char2search} placeholder="search character" onChange={(e) => this.SetCharSearch(e, "char2search")}></input>
                                <button className="button column is-one-fifth search_btn" type="button" onClick={() => this.searchChar("Char2SearchResult", this.state.char2search)}>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </button>
                            </div>
                            {
                                this.state.Char2SearchResult.count > 0 ? this.ShowChar2Select("char2Url") : this.WaitForValues()
                            }
                        </div>

                        <div className="field column is-one-third">
                            <label className="label">Planet</label>
                            <div className="control columns">
                                <input className="input column" type="text" value={this.state.planetsearch} placeholder="search planets" onChange={(e) => this.SetCharSearch(e, "planetsearch")}></input>
                                <button className="button column is-one-fifth search_btn" type="button" onClick={() => this.searchChar("PlanetSearchResult", this.state.planetsearch)}>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </button>
                            </div>
                            {
                                this.state.PlanetSearchResult.count > 0 ? this.ShowPlanetSelect("planetUrl") : this.WaitForValues()
                            }
                        </div>
                    </div>
                </form>

                <button type="button" className="button is-rounded generate_btn" 
                onClick={() => this.GenBtnClicked()}>{this.state.UpdateKey > 0 ? "New Plot" : "Generate a Plot"}</button>
                {
                    this.state.UpdateKey > 0 ? this.GeneratePlot() : console.log()
                }
            </div>
        );
    }
}