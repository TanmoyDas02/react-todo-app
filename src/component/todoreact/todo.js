import React, { useState, useEffect } from 'react'
import "./style.css"

// get the local storage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")

    if (lists) {
        return JSON.parse(lists)
    } else {
        return []
    }
}


const Todo = () => {
    const [inputdata, setinputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [iseditItem, setIsEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)

    // add the items function
    const addItem = () => {
        if (!inputdata) {
            alert('please fill the data')
        } else if (inputdata && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === iseditItem) {
                        return { ...curElem, name: inputdata }
                    }
                    return curElem
                })
            )

            setinputData([])
            setIsEditItem(null)
            setToggleButton(false)
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items, myNewInputData])
            setinputData("")
        }
    }

    // edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index
        })

        setinputData(item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }

    // how to delete items section
    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index
        })
        setItems(updatedItem)
    }

    // remove all the elements
    const removeAll = () => {
        setItems([])
    }

    // adding local storage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.png" alt="todologo" />
                        <figcaption>Add your list here  </figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='Add Items' className='form-control' value={inputdata} onChange={(event) => setinputData(event.target.value)} />
                        {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>}
                    </div>

                    {/* show our items */}
                    <div className='showItems'>
                        {
                            items.map((curElem) => {
                                return (
                                    <div className="eachItem" key={curElem.id}>
                                        <h3>{curElem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* remove all button */}

                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo