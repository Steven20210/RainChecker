import React, {useState} from 'react'

function Form(props) {
  const [name, setName] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }
  function handleChange(e) {
    setName(e.target.value);
  }

    return (
      // built-in onSubmit function will call handleSubmit once submit is pressed
        <form onSubmit={handleSubmit}> 
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            Add Items
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          value={name}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    )
}

export default Form
