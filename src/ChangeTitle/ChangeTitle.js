import React from 'react'

const ChangeTitle = ({ person }, props) => {
    return (
        <div>
            <p>Выбран пользователь с ID: <b>{person.id}</b> c UserId: <b>{person.userId}</b></p>
            Изменить поле title на: <br />
            <div className="input-group mb-3 mt-3">
                <div className="input-group-prepend">
                    <button
                        className="btn btn-outline-secondary"
                    >Change</button>
                </div>
                <input
                    type="text"
                    className="form-control"
                    value=""
                    onChange={props.onChangeTitle}
                />
            </div>
        </div>
    )
}

export default ChangeTitle