import React, { Component } from 'react';
import './App.css';



const DEFAULT_QUERY = 'bitcoin';
const PATH_BASE = 'https://newsapi.org/v2/'; 
const PATH_SEARCH = '/everything?'; 
const PARAM_SEARCH = 'q=';
const API_KEY = '&At&apiKey=b61eba3937b345bc8eaede3ab04750d3';


const largeColumn = {

  width: '40%',

};



const midColumn = {

  width: '30%',

};



const smallColumn = {

  width: '10%',

};


  
// const isSearched = searchTerm => item => 
//  item.title.toLowerCase().includes(searchTerm.toLowerCase())

class App extends Component {
  constructor(props){
    super(props);

    this.state = {

      result: null,
      searchTerm: DEFAULT_QUERY,

      };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${searchTerm}${API_KEY}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }
 
  setSearchTopStories(result) {

    this.setState({ result });

  }
  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);

    //  fetch(`${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${searchTerm}${API_KEY}`)
    //    .then(response => response.json())
    //    .then(result => this.setSearchTopStories(result))
    //    .catch(error => error)

    }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onSearchSubmit(event){
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }
  onDismiss(id){
    const isNotId = item => item.title !== id;
    const updatedList = this.state.result.articles.filter(isNotId);
    this.setState({ 
      result: {...this.state.result, articles: updatedList }
    });

  }
render() {
  const {searchTerm, result} = this.state;
    if(!result) { return null; }

return (
   <div className="page">
     <div className= 'interactions'>
     <Search
      value={searchTerm}
      onChange={this.onSearchChange}
      onSubmit= {this.onSearchSubmit}
      >
      Search
      </Search>
      </div>
      { result &&
       <Table
      list ={result.articles}
      onDismiss={this.onDismiss}
      /> 
      
      }
      
</div>
);
}
}  

    const Search =  ({ value, onChange, onSubmit, children }) =>
  <form onSubmit ={onSubmit}>
         <input 
          type="text"
          value={value}
          onChange={onChange}
          />
          <button type="submit">
            {children}
          </button>
      </form>
    
  

    const Table = ({ list, onDismiss }) =>
    
      <div className= "table">
        {list.map(item =>
        <div key={item.title} className="table-row">
          <span style={largeColumn}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title} </a>
          </span>
          <span style={midColumn}>{item.author}</span>
          <span style={smallColumn}>{item.num_comments}</span>
          <span style={smallColumn}>{item.points}</span>
          <span style= {smallColumn}>
            <Button onClick={() => onDismiss(item.title)}
              type="button"
              className="button-inline"
              >
                Dismiss
              </Button>
          </span>
        </div>
        )}
    </div>
    


    const Button = ({onClick, className = '', children, }) =>
      <button 
        onClick={onClick}
        className={className}
        type="button"
        >
          {children}
        </button>
    
 
export default App;

