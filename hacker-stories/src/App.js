import React from "react"



const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    }
  ]

  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    )
  
    React.useEffect(() => {
      localStorage.setItem(key, value)
    }, [value, key])

    return [value, setValue]
  }

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    "search",
    "React"
  )

  const handleSearch = event => {
    setSearchTerm(event.target.value)

    localStorage.setItem("search", event.target.value)
  }

  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>  
      </InputWithLabel>

      <List list={searchedStories}/>
    </div>
  );
}

const InputWithLabel = ({ 
  id,
  value, 
  type = "text",
  onInputChange,
  children 
}) => (

    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input 
        id={id} 
        type={type} 
        value={value}
        onChange={onInputChange} 
      />

    </>
)

const List = ({ list }) => 
  list.map(item => <Item key={item.objectID} item={item} />)

const Item = ({ item }) => (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    )

export default App;
