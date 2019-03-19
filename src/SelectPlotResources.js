import React from 'react';

export default class PlotGenerator extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            searches: this.props.searches,
            selectType: this.props.type,
        };
    }

    handleChange(e)
    {
        this.props.onSelectChange(e.target.value, this.state.selectType);
    }

    render() {
        return (
            <div className="control">
                <div className="select select_resources">
                    <select onChange={(e, type) => this.handleChange(e, type)}>
                        <option value="none" label="Pick a Character">Pick a Character</option>
                        {
                            this.state.searches.results.map((resource) => {
                                return (
                                    <option value={resource.url} label={resource.name}>{resource.name}</option>
                                );
                            })
                        }
                    </select>
                </div>
            </div>
        );
    }
}