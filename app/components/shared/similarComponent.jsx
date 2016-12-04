import React from 'react';
import {Link} from 'react-router';
import {ImageUrl} from '../../api/ApiUrl';
import {GridList, GridTile} from 'material-ui/GridList';

export default class SimilarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { similar } = this.props;

        return (
            <GridList>
                {similar.results.map(similar => {
                    const image = `${ImageUrl}w300${similar.backdrop_path}`;
                    return (
                        <GridTile
                            key={similar.id}
                            containerElement={similar.original_title != null ?
                                <Link to={`/movie/${similar.id}/${similar.original_title}`} /> :
                                <Link to={`/tv/${similar.id}/${similar.original_name}`} />
                            }
                            title={similar.original_title != null ? similar.original_title : similar.original_name}
                        >
                            {similar.backdrop_path ? <img src={image}/> : null}
                        </GridTile>
                    )
                })}
            </GridList>
        )
    }
}