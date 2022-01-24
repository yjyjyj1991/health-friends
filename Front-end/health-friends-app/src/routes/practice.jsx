import React from "react"
import { red, green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

class SearchBar extends React.Component{
  constructor(props){
    super(props)
    this.onTextChange=this.onTextChange.bind(this)
    this.onCheckChange=this.onCheckChange.bind(this)
  }
  
  onTextChange(e){
    this.props.onTextChange(e.target.value)
  }
  onCheckChange(e){
    this.props.onCheckChange(e.target.checked)
  }

  render(){
    return (
      <form action="">
        <input type="text" onChange={this.onTextChange}/>
        <input type="checkbox" onChange={this.onCheckChange}/>
        {' '}Only show products in stock
      </form>
    )
  }
}

class ProductCategoryRow extends React.Component{
  render(){
    return(
      <tr>
        <th colSpan={2}>{this.props.category}</th>
      </tr>
    )
  }
}

class ProductRow extends React.Component{
  render(){
    return(
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.price}</td>
      </tr>
    )
  }
}

class ProductTable extends React.Component{
  render(){
    const products = this.props.products
    const isStockOnly=this.props.isChecked
    const filterText=this.props.filterText
    const rows = []
    let lastCategory=''

    products.forEach(product=>{
      if (product.name.indexOf(filterText)===-1){return}  
      if (isStockOnly && !product.stocked){return}
      if (product.category!==lastCategory) {
        rows.push(<ProductCategoryRow category={product.category}/>)
        lastCategory=product.category
      }
      rows.push(<ProductRow name={product.name} price={product.price}/>)
    })

    return(
      <table>
        <thead>
          <tr><th>Name</th><th>Price</th></tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}


export default class FilterableProductTable extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isChecked:false,
      filterText:'',
    }
    this.handleTextChange=this.handleTextChange.bind(this)
    this.handleCheckChange=this.handleCheckChange.bind(this)
  }
  
  handleCheckChange(isChecked){
    this.setState({isChecked:isChecked})
  }

  handleTextChange(filterText){
    this.setState({filterText:filterText})
  }

  render(){
    return(
      <ThemeProvider theme={theme}>
        <SearchBar 
          isChecked={this.state.isChecked}
          filterText={this.state.filterText}
          onTextChange={this.handleTextChange}
          onCheckChange={this.handleCheckChange}
        />
        <ProductTable 
          products={this.props.products} 
          isChecked={this.state.isChecked}
          filterText={this.state.filterText}
        />
        <Stack  spacing={2} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      </ThemeProvider>
    )
  }
}

