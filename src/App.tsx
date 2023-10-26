import { useState } from "react"
import { Todos } from "./components/Todos"
import {type FilterValues, type TodoId, type Todo as TodoType, TodoTitle } from "./types"
import { TODO_FILTERS } from "./const"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"

const mockTodos =[
  {
    id: "1",
    title: "Jugar Lol",
    completed: true,
  },
  {
    id: "2",
    title: "Aprender React con typescript",
    completed: false,
  },
  {
    id: "3",
    title: "Graduarme de Cic",
    completed: false,
  }
]

const App =(): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValues>(TODO_FILTERS.ALL)

  const handlerRemove = ({id}:TodoId): void => {
    const newsTodos = todos.filter(todo => todo.id != id)
    setTodos(newsTodos)
  }

  const handlerCompleted = (
    {id, completed}: Pick<TodoType, "id" | "completed">): void =>{
    const newsTodos = todos.map(todo => {
      if (todo.id == id){
        return{
          ...todo,
          completed
        }
      }
      return todo
      })
      setTodos(newsTodos)

  }

  const handlerFilterChange = (filter: FilterValues): void =>{
    setFilterSelected(filter)
  }

  const handlerRemoveAllCompleted=(): void =>{
    const newsTodos = todos.filter(todo => !todo.completed)
    setTodos(newsTodos)
  }


  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount= todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return !todo.completed
    return todo
  })
  const handlerAddTodo =({title}: TodoTitle):void=>{
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }
    const newTodos = [...todos,newTodo]
    setTodos(newTodos)
  }
  return (
    <div className="todoapp">
     <Header onAddTodo={handlerAddTodo}/>
      
    <Todos 
    onToggleCompleteTodo = {handlerCompleted}
    onRemoveTodo = {handlerRemove}
    todos= {filteredTodos}/> 

    <Footer
    activeCount={activeCount}
    completedCount={completedCount}
    filterSelected={filterSelected}
    onClearCompleted={handlerRemoveAllCompleted}
    handlerFilterChange={handlerFilterChange}

    />
    </div>
  )
}

export default App
