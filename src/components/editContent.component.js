import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {Link} from 'react-router-dom';
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
        this.onChangeCast =this.onChangeCast.bind(this);
        this.onChangeProducedBy= this.onChangeProducedBy.bind(this);
        this.onChangeDirector= this.onChangeDirector.bind(this);
        this.onChangeMusic= this.onChangeMusic.bind(this);
        this.onChangeLanguage =this.onChangeLanguage.bind(this);

        this.onSubmit= this.onSubmit.bind(this);
  this.state={
            title:'',
            description:'',
            duration:0,
            date: new Date(),
            cast:'',
            producedBy:'',
            director:'',
            music:'',
            language:''
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
          date: new Date(response.data.date),
          cast:response.data.cast,
          producedBy:response.data.producedBy,
          director:response.data.director,
          music:response.data.music,
          language:response.data.language
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

  onChangeCast(e) {
    this.setState({
        cast: e.target.value
    });
}
onChangeProducedBy(e){
    this.setState({producedBy: e.target.value})
}
onChangeDirector(e){
    this.setState({
        director: e.target.value
    });
}
onChangeMusic(e) {
    this.setState({
        music: e.target.value
    });
}
onChangeLanguage(e){
    this.setState({
        language: e.target.value
    });
}



   onSubmit(e){
        e.preventDefault();
        const content= {
          title: this.state.title,
          description: this.state.description,
          duration:this.state.duration,
          date: this.state.date,
          cast:this.state.cast,
          producedBy:this.state.producedBy,
          director:this.state.director,
          music:this.state.music,
          language:this.state.language
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
                  <label>Film *</label>
                  <input type="text" value={this.state.title} className="form-control" onChange={this.onChangeTitle} required></input>
              </div>
              <div className="form-group">
                  <label>Description *</label>
                  <input type="text" value={this.state.description} className="form-control" onChange={this.onChangeDescription} required></input>
              </div>
              <div className="form-group">
                  <label>Film Duration(in minutes) *</label>
                  <input type="number" value={this.state.duration} className="form-control" onChange={this.onChangeDuration} required></input>
              </div>
              <div className="form-group">
                  <label>Date of Release *</label>
                  <div>
                      <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate} required/>
                  </div>
                  {/* <input type="date" value={this.state.date} className="form-control" onChange={this.onChangeDate}></input> */}
              </div>


              <div className="form-group">
                    <label>Cast crew</label>
                    <input type="text" value={this.state.cast} className="form-control" onChange={this.onChangeCast} ></input>
                </div>
                <div className="form-group">
                    <label>Produced By *</label>
                    <input type="text" value={this.state.producedBy} className="form-control" onChange={this.onChangeProducedBy} required></input>
                </div>
                <div className="form-group">
                    <label>Film director</label>
                    <input type="text" value={this.state.director} className="form-control" onChange={this.onChangeDirector} ></input>
                </div>
                <div className="form-group">
                    <label>Music</label>
                    <input type="text" value={this.state.music} className="form-control" onChange={this.onChangeMusic}></input>
                </div>
                <div className="form-group">
                    <label>Language</label>
                    <input type="text" value={this.state.language} className="form-control" onChange={this.onChangeLanguage}></input>
                </div>
              <div className="float-right">
                  <span style={{paddingRight: "19px"}} ><button className="btn btn-primary" type="submit">Update</button></span>
                  <span>
                  <button className="btn btn-danger"><Link className="text-white" to='/home'>Cancel</Link> </button>
                  </span>
                 
                  
              </div>
          </form>
      </div>
      );
    }
}