const Filter = ({ filter, setFilter }) => (
  <div className="filter">
    filter shown with: <input 
      className="filter-input" 
      value={filter} 
      onChange={e => setFilter(e.target.value)} 
    />
  </div>
);

const PersonForm = ({ newPerson, setNewPerson, handleAddBtnClicked }) => (
  <>
    <h3>Add a new</h3>
    <form>
      <div>
        name: <input 
          className="name-input" 
          value={newPerson.name} 
          onChange={e => setNewPerson({...newPerson, name: e.target.value})} 
        />
      </div>
      <div>
        number: <input
          className="phone-number-input" 
          value={newPerson.number} 
          onChange={e => setNewPerson({...newPerson, number: e.target.value})} 
        />
      </div>
      <div>
        <button 
          className="add-btn" 
          type="submit"
          onClick={handleAddBtnClicked}
        >
          add
        </button>
      </div>
    </form>
  </>
);

const Person = ({ person, handleDeleteBtnClicked }) => (
  <p>{person.name} {person.number} 
    <span><button value={person.id} onClick={handleDeleteBtnClicked}>delete</button> </span>
  </p>
)

const Persons = ({ persons, filter, handleDeleteBtnClicked }) => {
  const personList = filter.length === 0
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
    <h3>Numbers</h3>
    {personList.map(p => <Person 
      key={p.name} 
      person={p} 
      handleDeleteBtnClicked={handleDeleteBtnClicked} 
    />)}
    </>
  )
}

const Notification = ({ message }) => {
  const style = {
    color: message.error ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    border: message.error ? "2px solid red" : "2px solid green",
    padding: "10px",
    marginBottom: "10px",
  };

  return (
    message.text.length > 0 && 
      <div className="noti-banner" style={style}>{message.text}</div>
  )
}

const PhoneList = ({
  filter,
  setFilter,
  newPerson, 
  setNewPerson, 
  handleAddBtnClicked,
  handleDeleteBtnClicked,
  persons,
  message
}) => (
  <>
    <Notification message={message} />
    <Filter filter={filter} setFilter={setFilter} />
    <PersonForm 
      newPerson={newPerson} 
      setNewPerson={setNewPerson} 
      handleAddBtnClicked={handleAddBtnClicked} 
    />
    <Persons 
      persons={persons}
      filter={filter}
      handleDeleteBtnClicked={handleDeleteBtnClicked}
    />
  </>
)

export default PhoneList
