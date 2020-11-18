import React, { Component } from 'react'
import Loader from './Loader/Loader'
import Table from './ReactTable/ReactTable'
import _ from 'lodash' // библионтека сортировки
import ReactPaginate from 'react-paginate' // пагинация
import TableSearch from './TableSearch/TableSearch'

class App extends Component {

  state = {
    isLoading: true,
    data: [],
    search: '',
    sort: 'asc', // desc одно из насправлений
    sortField: 'id', // сортировка по умолчанию
    changeField: null, // изменение title
    currentPage: 0 // ткущая страница
  }

  async componentDidMount() {
    const responce = await fetch(`https://jsonplaceholder.typicode.com/albums/`)
    const data = await responce.json() // результат работы responce

    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort) // чтобы получилась сортировка по умолчанию
    })
  } // уже есть готовое DOM-дерево

  onSort = sortField => {
    const clonedData = this.state.data.concat() // копия массива data
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc' // изменить направлениe сортировки поля

    const data = _.orderBy(clonedData, sortField, sort)

    this.setState({ data, sort, sortField })
  }

  pageChangeHandler = ({ selected }) => {
    this.setState({ currentPage: selected }) // номер страницы
  }

  searchHandler = search => {
    this.setState({ search, currentPage: 0 })
  }

  getFilteredData() {
    const { data, search } = this.state

    if (!search) {
      return data
    }

    return data.filter(item => {
      return item['title'].includes(search)
        || item['userId'].toString().includes(search)
        || item['id'].toString().includes(search)
    }) // фильтрация по title userid id
  }

  onChange = changeField => {
    this.setState({ changeField })
  }

  onChangeTitle = (title, index) => {
    console.log(title, index)
  }

  render() {

    const pageSize = 20 // лимит для одной страницы

    const filteredData = this.getFilteredData()

    const pageCount = Math.ceil(filteredData.length / pageSize) // сколько всего сраниц округление в большую сторону

    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage] // на сколько элементов разделить подмассивы
    
    return (
      <div className="container">
        {
          this.state.isLoading
            ? <Loader />
            : <React.Fragment>
              <TableSearch onSearch={this.searchHandler} />
              <Table
                data={displayData}
                onSort={this.onSort}
                sort={this.state.sort}
                sortField={this.state.sortField}
                onChange={this.onChange}
              /></React.Fragment>

        }

        {
          this.state.data.length > pageSize
            ? <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.pageChangeHandler} // при нажатии на кнопку изменения страницы
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousClassName='page-item'
              nextClassName='page-item'
              previousLinkClassName='page-link'
              nextLinkClassName='page-link'
              forcePage={this.state.currentPage} // синхронизация страницы с состоянием нашего state
            /> : null // логика пагинации
        }
      </div>
    );
  }
}


export default App;
