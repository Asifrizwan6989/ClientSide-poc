// import React from 'react';

// function Add() {
//     return (
//     <h1>Add content page</h1>
//     );
//   }

//   export default Add; 


  import React, {Component} from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import axios from 'axios';

  export default class Add extends Component{
      constructor(props){
          super(props);

          this.onChangeTitle = this.onChangeTitle.bind(this);
          this.onChangeDescription = this.onChangeDescription.bind(this);
          this.onChangeDuration = this.onChangeDuration.bind(this);
          this.onChangeDate =this.onChangeDate.bind(this);

          this.onSubmit= this.onSubmit.bind(this);
    this.state={
              title:'',
              description:'',
              duration:0,
              date: new Date()
          }
      }
    //   componentDidMount(){
    //       this.setState({
    //           title: 'test Lion king'
    //       })
    //   }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({description: e.target.value})
    }
    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
            date: date
        });
    }
     onSubmit(e){
          e.preventDefault();
          const content= {
            title: this.state.title,
            description: this.state.description,
            duration:this.state.duration,
            date: this.state.date
          }
         console.log(content);
      axios.post("http://localhost:5000/content/add", content).then(res => window.location='/home');
      }
      
      render(){
        return (
        <div className="container">
            <h1>Add new Film</h1>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Film</label>
                    <input type="text" value={this.state.title} className="form-control" onChange={this.onChangeTitle} required></input>
                </div>
                <div className="form-group">
                    <label>Cast & Description</label>
                    <input type="text" value={this.state.description} className="form-control" onChange={this.onChangeDescription}></input>
                </div>
                <div className="form-group">
                    <label>Film Duration(in minutes)</label>
                    <input type="number" value={this.state.duration} className="form-control" onChange={this.onChangeDuration}></input>
                </div>
                <div className="form-group">
                    <label>Date of Release</label>
                    <div>
                        <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>
                    {/* <input type="date" value={this.state.date} className="form-control" onChange={this.onChangeDate}></input> */}
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
        );
      }
  }