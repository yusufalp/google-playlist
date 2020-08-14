import React from 'react';
import Play from './GooglePlay/Play';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      search: '',
      sort: '',
      genres: '',
      error: null
    }
  }
  setSearch(search) {
    this.setState({
      search
    })
  }
  setSort(sort) {
    this.setState({
      sort
    })
  }
  setGenres(genres) {
    this.setState({
      genres
    })
  }
  handleSubmit(e) {
    e.preventDefault();

    const baseURL = 'http://localhost:8000/apps'
    const params = [];
    if (this.state.search) {
      params.push(`search=${this.state.search}`)
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`)
    }
    if (this.state.genres) {
      params.push(`Genres=${this.state.genres}`)
    }

    const query = params.join('&');
    const url = `${baseURL}?${query}`

    console.log(url);

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          playlists: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get playlist at this time'
        })
      })
  }
  render() {
    const playlist = this.state.playlists.map((playlist, i) => {
      return <Play {...playlist} key={i} />
    })

    return (
      <main className='App'>
        <h1>Google Play Store List</h1>
        <div className='search'>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor='search'>Search</label>
            <input
              type='text'
              id='search'
              name='search'
              value={this.state.search}
              onChange={(e) => this.setSearch(e.target.value)} />

            <label htmlFor='sort'>Sort: </label>
            <select id='sort' name='sort' onChange={(e) => this.setSort(e.target.value)}>
              <option value=''>None</option>
              <option value='Rating'>Rating</option>
              <option value='App'>App Name</option>
            </select>

            <label htmlFor='genres'>Genres: </label>
            <input
              type='text'
              id='genres'
              name='genres'
              value={this.state.genres}
              onChange={(e) => this.setGenres(e.target.value)} />

            <button type='submit'>Search</button>
          </form>
          <div className='App_error'>{this.state.error}</div>
        </div>
        {playlist}
      </main>
    )
  }
}

export default App;
