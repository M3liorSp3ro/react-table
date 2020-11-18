import React from 'react'
import './ReactTable.css'

const ReactTable = props => ( // создание глупого компонента, который просто делает шаблон и не имеет особой логики (для экономии памяти)
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>
                    ID {props.sortField === 'id' ? <small>{props.sort}</small> : null} 
                    {/* показать направление сортировки аналогично для остальных th*/}
                </th> 
                <th onClick={props.onSort.bind(null, 'userId')}>
                    User ID {props.sortField === 'userId' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'title')}>
                    Title
                    {props.sortField === 'title' ? <small>{props.sort}</small> : null}

                </th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.userId}</td>
                    <td>{item.title}</td>
                </tr>
            ))}
        </tbody>
    </table>
)

export default ReactTable