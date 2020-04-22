
  import React, {Component} from 'react';
  import {Link} from 'react-router-dom';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import axios from 'axios'
  import mobiscroll from '@mobiscroll/react-lite';
  import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';

mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
}
const monthNames ={'01':'January', '02':'February', '03':'March', '04':'April','05':'May', '06':'June','07':'July', 
'08':'August','09':'September', '10':'October','11':'November', '12':'December',};
const months= ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
console.log(`This line n0 16 from home?: ${monthNames['03']}`)
// var time = date[4].split(":");
// var hour = time[0];
// var minute = time[1];
// var second = time[2];

const Content= props=>(
 
  <tr>
    <td>{props.content.title}</td>
    <td>{props.content.description}</td>
    <td>{props.content.duration}</td>
    <td>{props.content.producedBy}</td>
    <td>{monthNames[props.content.date.slice(5,7)]}</td>
    {/* <td>{monthNames[props.content.date.substring(5,7)]}</td> */}
    <td>{props.content.date.substring(0,4)} </td>
    <td>
      <Link to={'/edit/'+props.content._id}>edit</Link> | <a href="#" onClick={()=> {props.deleteContent(props.content._id) }}> Delete</a> | <Link to={`/show/${props.content._id}`}>View</Link>
    </td>
  </tr>
  
)

  
  export default class Home extends Component{
  constructor(props){
    super(props);
    // this.contents= axios.get("http://localhost:5000/content/").then((res) =>res.data);
    this.deleteContent = this.deleteContent.bind(this);
   this.state={contents:[]}

   this.onChangeYearSearch= this.onChangeYearSearch.bind(this);
   this.onChangeMonthSearch= this.onChangeMonthSearch.bind(this);
   this.onChangeProducerSearch =this.onChangeProducerSearch.bind(this);


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
};


deleteContent(id){
//start here

mobiscroll.confirm({
  title: 'Are you sure',
  okText: 'yes',
  cancelText: 'No',
  callback: (res) => {
      mobiscroll.toast({
          message: res ? (axios.delete('http://localhost:5000/content/'+id).then(res => this.setState({contents: this.state.contents.filter(el=>el._id !== id)
        }))) : 'Delete process Cancelled'
      });
     }
});

//end here
 
}

onChangeYearSearch(e) {
  this.setState({
      year: e.target.value
  });
}
onChangeMonthSearch(e){
  this.setState({month: e.target.value})
}
onChangeProducerSearch(e){
  this.setState({
      production: e.target.value
  });
}


contentsList(){
  return this.state.contents.map(currentContent=>{
if(this.state.year || this.state.month ||this.state.production){
if(this.state.year){
 console.log("Selected Year "+this.state.year);
}else if(this.state.month){
  console.log("Selected Month "+this.state.month);
}else{
  console.log("Selected production "+this.state.production);
}
}
if(this.deleteContent){
  return <Content content={currentContent} deleteContent={this.deleteContent} key={currentContent._id}/>
}



   
  })
}

      render(){

        let minOffset = 0, maxOffset = 200;
        let thisYear = (new Date()).getFullYear();
        let allYears = [];
        for(let x = 0; x <= maxOffset; x++) {
            allYears.push(thisYear - x)
        }
    
        const yearList = allYears.map((x) => {return(<option placeholder={`Select year of release`} key={x}>{x}</option>)});
      const monthList= months.map((m) => {return(<option placeholder={'Select month of release'} key={m}>{m}</option>)});
      const productionList= this.state.contents.map((p)=>{return(<option placeholder={'Select Production'} key={p._id}>{p.producedBy}</option>)});


        return (
          <div className="container">
            <br/>
            <div className="row">
            <div className="col-md-4">
            <label>Select year</label>
                 <select className="form-control" onChange={this.onChangeYearSearch}> 
                    {yearList}
                </select>
            </div>
            <div className="col-md-4">
            <label>Select month</label>
                 <select className="form-control" onChange={this.onChangeMonthSearch}> 
                    {monthList}
                </select>
            </div>
            <div className="col-md-4">
            <label>Select Production</label>
                 <select className="form-control" onChange={this.onChangeProducerSearch}> 
                    {productionList}
                </select>
            </div>
            </div>
            <br/>
            {/* <h1>Home content page</h1> */}
           <table className="table">
             <thead className="thead-light">
               <tr>
                 <th>Film</th>
                 <th>Cast & Description</th>
                 <th>Film Duration</th>
                 <th>Production</th>
                 <th>Month of Release</th>
                 <th>Year of Release</th>
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