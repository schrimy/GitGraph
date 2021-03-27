import SearchBar from './containers/SearchBar'
import DataView from './containers/DataView'

//TODO: local storage for last search

function App() {
  return (
    <div>
      <header className='bg-secondary'>
        <SearchBar />
      </header>
      <main>
        <DataView />
      </main>
    </div>
  )
}

export default App
