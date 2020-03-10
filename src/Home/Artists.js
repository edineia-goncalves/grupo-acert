import React from 'react';
import Search from '../components/Search';
import Api from "../Services/Artists";
import BarGridList from "../components/GridList"

class Artists extends React.Component {
    constructor(props) {
        super(props)
        this.state = { items: [] };
        localStorage.setItem("searchByArtist", JSON.stringify([]))
        this.searchArtists = this.searchArtists.bind(this);
    }

    saveSearch(term) {
        const storedSearch = JSON.parse(localStorage.getItem("searchByArtist"));
        storedSearch.push(term)
        localStorage.setItem("searchByArtist", JSON.stringify(storedSearch));
    }

    searchArtists(term) {
        this.saveSearch(term);

        Api.getByArtist(term).then(({ results }) => {
            const data = results && results.artistmatches && results.artistmatches.artist

            if (!data) return

            const list = data.map(artist => {
                return {
                    name: artist.name,
                    listeners: `Ouvintes ${artist.listeners}`,
                    url: artist.url,
                    image: Object.values(artist.image[3], "#text")
                }
            })
            this.setState({
                items: [...list]
            })
        }).catch((error) => error && this.setState({
            items: []
        }));
    }

    render() {
        return (
            <div>
                <Search placeholder="Digite o nome do artista e aperte enter para pesquisar..."
                    handleKeyPress={this.searchArtists}
                />
                <React.Fragment>
                    <BarGridList data={this.state.items}></BarGridList>
                </React.Fragment>
            </div>
        )
    }
}

export default Artists;