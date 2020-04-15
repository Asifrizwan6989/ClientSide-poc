
  import React, {Component} from 'react';
  import {Link} from 'react-router-dom';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import axios from 'axios'

const Content= props=>(
  <tr>
    <td>{props.content.title}</td>
    <td>{props.content.description}</td>
    <td>{props.content.duration}</td>
    <td>{props.content.date.substring(0,10)}</td>
    <td>
      <Link to={'/edit/'+props.content._id}>edit</Link> | <a href="#" onClick={()=> {props.deleteContent(props.content._id) }}> Delete</a>
    </td>
  </tr>
)

  
  export default class Home extends Component{
  constructor(props){
    super(props);
    // this.contents= axios.get("http://localhost:5000/content/").then((res) =>res.data);
    this.deleteContent = this.deleteContent.bind(this);
   this.state={contents:[]}
  }
componentDidMount(){
  axios.get("http://localhost:5000/content/")
  .then(response =>{
    console.log(response);
    this.setState({contents:response.data})
    }).catch((error) => {
      console.log(error);
  })
console.log(this.contents);
}
deleteContent(id){
  axios.delete('http://localhost:5000/content/'+id).then(res => console.log(res.data));
  this.setState({contents: this.state.contents.filter(el=>el._id !== id)
  })
}
contentsList(){
  return this.state.contents.map(currentContent=>{
    return <Content content={currentContent} deleteContent={this.deleteContent} key={currentContent._id}/>
  })
}

      render(){
        return (
          <div className="container">
            <br/>
            {/* <h1>Home content page</h1> */}
           <table className="table">
             <thead className="thead-light">
               <tr>
                 <th>Film</th>
                 <th>Cast & Description</th>
                 <th> Film Duration</th>
                 <th>Date of Release</th>
                 <th>Actions</th>
               </tr>
             </thead>
             <tbody>
               {this.contentsList()}
             </tbody>
           </table>

          </div>
        

        );
      }
  }