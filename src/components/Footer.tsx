/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilterValues } from "../types"
import { Filters } from "./Filters"

interface Props{
    activeCount : number,
    completedCount: number,
    filterSelected: FilterValues,
    onClearCompleted: ()=> void,
    handlerFilterChange: (filter: FilterValues) => void

}

export const Footer: React.FC<Props> = ({
    activeCount = 0,
    completedCount=0,
    filterSelected,
    handlerFilterChange,
    onClearCompleted,
     
    
    }) => {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> Tareas Pendientes
            </span>

            <Filters 
            filterSelected ={filterSelected}
            onFilterChange ={handlerFilterChange}
            />


            {
                completedCount > 0 && (
                    <button className= 'clear-completed'
                    onClick={onClearCompleted}
                    >
                    borrar completadas
                    </button>
                )
            }

        </footer>


    )
}