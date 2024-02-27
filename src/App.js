import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const App = (props) => {
  const [todo, setTodo] = useState(null);
  const [gettodo, getsetTodo] = useState([]);
  const [edittodo, geteditTodo] = useState();
  const [editbtn, editbtnfunc] = useState(false);
  const [row, setRow] = useState("")

  const handleAddTodo = () => {
    if (todo) {
      axios.post("http://localhost:4200/todo", {
        todo: todo,
        createdAt: new Date().getDate(),
        createdDay: new Date().getDay(),
        createdYear: new Date().getFullYear()
      })
        .then(response => {
          // Handle success response if needed
          getData(response)
          console.log('Todo added successfully:', response);
          setTodo(null)
          document.getElementById('inp').value = '';

        })
        .catch(error => {
          // Handle error
          console.error('Error adding todo:', error);
        });
    }

    else {
      alert('Please add todo')
    }
  };
  const getData = () => {
    axios.get("http://localhost:4200/todo").then((response) => {
      getsetTodo(response.data)
      console.log('Todo get successfully:', response);
    }).catch((error) => {
      console.log('Error getting data:', error);
    })
  }

  const deleteData = (data) => {
    const { id } = data
    axios.delete(`http://localhost:4200/todo/${id}`).then((response) => {


      console.log(response)
      getData()
    }).catch((error) => {
      console.log(error)
    })
  }
  const handleEdittodo = (item, index) => {
    geteditTodo(item.todo)
    setRow(index)
 

    editbtnfunc(true)
  }
  const upd_todo = () => {
    console.log('row', row);
    axios.patch(`http://localhost:4200/todo/${row}`, {
      todo: edittodo
    }).then((response) => {
      console.log("response", response);
      getData();
    }).catch((error) => {
      console.log(error);
    });
  };
  
  useEffect(() => {
    getData();
  }, [])
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card" id="list1" style={{ borderRadius: props.borderRadius, backgroundColor: props.backgroundColor }}>
                <div className="card-body py-4 px-4 px-md-5">

                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">

                    <b>Todo</b>
                  </p>

                  <div className="pb-2">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-row align-items-center">
                          <input type="text"
                            id="inp"
                            className="form-control form-control-lg"
                            placeholder="Add new..."
                            defaultValue={edittodo}
                            onChange={(e) => setTodo(e.target.value)} />
                          <a href="#!" data-mdb-toggle="tooltip" title="Set due date"><i
                            className="fas fa-calendar-alt fa-lg me-3"></i></a>
                          <div>
                            {
                              editbtn ? <button type="button" className="btn btn-primary" onClick={upd_todo()}>change</button>
                                : <button type="button" className="btn btn-primary" onClick={handleAddTodo}>Add</button>
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />
                  <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                    <p className="small mb-0 me-2 text-muted">Filter</p>
                    <select className="select">
                      <option value="1">All</option>
                      <option value="2">Completed</option>
                      <option value="3">Active</option>
                      <option value="4">Has due date</option>
                    </select>
                    <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                    <select className="select">
                      <option value="1">Added date</option>
                      <option value="2">Due date</option>
                    </select>
                    <a href="#!" style={{ color: props.color }} data-mdb-toggle="tooltip" title="Ascending"><i
                      className="fas fa-sort-amount-down-alt ms-2"></i></a>
                  </div>
                  {
                    gettodo.map((item, index) => {
                      return (

                        <ul key={index} className="list-group list-group-horizontal rounded-0 bg-transparent">
                          <li
                            className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                            <div className="form-check">
                              <input className="form-check-input me-0" type="checkbox" value="" id="flexCheckChecked1"
                                aria-label="..." defaultChecked />
                            </div>
                          </li>
                          <li
                            className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                            <p className="lead fw-normal mb-0">{item.todo}</p>
                          </li>
                          <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                            <div className="d-flex flex-row justify-content-end mb-1">
                              <a href="#!" className="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i
                                className="fas fa-pencil-alt me-3" onClick={() => handleEdittodo(item,item.id)}></i></a>
                              <a href="#!" className="text-danger" data-mdb-toggle="tooltip" title="Delete todo"><i
                                className="fas fa-trash-alt" onClick={() => deleteData(item)}></i></a>
                            </div>
                            <div className="text-end text-muted">
                              <a href="#!" className="text-muted" data-mdb-toggle="tooltip" title="Created date">
                                <p className="small mb-0"><i className="fas fa-info-circle me-2"></i>{item.createdAt} /{item.createdDay} /{item.createdYear}</p>
                              </a>
                            </div>
                          </li>
                        </ul>

                      )
                    })
                  }



                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App;