import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';

mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
}


export default class Edit extends Component{
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
    componentDidMount(){
      axios.get("http://localhost:5000/content/"+ this.props.match.params.id)
      .then(response =>{
        console.log(response);
        this.setState({
          title: response.data.title,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })
        }).catch((error) => {
          console.log(error);
      })
    console.log(this.contents);
    }
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

       mobiscroll.confirm({
        title: 'Are you sure',
        okText: 'yes',
        cancelText: 'No',
        callback: (res) => {
            mobiscroll.toast({
                message: res ? (axios.post("http://localhost:5000/content/update/"+this.props.match.params.id, content)
                .then((result) => {
                    console.log("edit line no 88"+this.props.history);
                  this.props.history.push("/home")
                })) : 'Edit process cancelled'
            });
        }
    });


    // axios.post("http://localhost:5000/content/update/"+this.props.match.params.id, content).then(res => console.log(res.data));
       //window.location='/home';
    }
    
    render(){
      return (
      <div className="container">
          <br/>
          <h1>Edit Film</h1>
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
                  <button className="btn btn-primary" type="submit">Update</button>
                  
              </div>
          </form>
      </div>
      );
    }
}