import React, {Component} from 'react';
import { MDBDataTable} from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import axios from 'axios';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';

const columnsForTable = [
  {
    label: 'Film',
    field: 'title',
    sort: 'asc',
    width: 150
  },
  {
    label: 'Description',
    field: 'description',
    sort: 'asc',
    width: 270
  },
  {
    label: 'Duration',
    field: 'duration',
    sort: 'asc',
    width: 200
  },
  {
    label: 'Production',
    field: 'producedBy',
    sort: 'asc',
    width: 100
  },
  {
    label: 'Month of release date',
    field: 'month',
    sort: 'asc',
    width: 150
  },
  {
    label: 'Year of release',
    field: 'year',
    sort: 'asc',
    width: 100
  },

  {
    label: 'Actions',
    field: 'action',
    sort:'disabled',
    width: 100
  }
];

const defaultData = {
  columns: columnsForTable,
  rows: [],
};

const monthNames ={'01':'January', '02':'February', '03':'March', '04':'April','05':'May', '06':'June','07':'July', 
'08':'August','09':'September', '10':'October','11':'November', '12':'December',};








class DatatablePage extends Component{

    // this.contents= axios.get("http://localhost:5000/content/").then((res) =>res.data);
   // this.deleteContent = this.deleteContent.bind(this);
  state={contents:[],
    rows: [],
    data: defaultData

  }

  
  componentDidMount(){
    // let fontName = 'AbrilFatface-Regular'
    // GlobalFont.applyGlobal(fontName) 

    axios.get("http://localhost:5000/content/")
    .then(response =>{
      console.log(response);
      this.setState({contents:response.data})
      this.dataBuilder(response.data);
      
      }).catch((error) => {
        console.log(error);
    })
  console.log(this.contents);
  };

 
    rowdata=(contents)=>{
      const finalValue=[]
      //players.map((player) => {
      contents.map((currentvale)=>{
        const temp={};
        console.log("Line no 31"+currentvale);
         temp.title= currentvale.title;
         temp.description= currentvale.description;
         temp.duration= currentvale.duration;
         temp.producedBy= currentvale.producedBy;
         temp.monthconvert=currentvale.date.slice(5,7)
         temp.month=monthNames[temp.monthconvert];
         temp.year=currentvale.date.substring(0,4);
      
         temp.action= [<ul className="nav justify-content-center">
         <li className="nav-item">
           <a className="nav-link" href={`/show/${currentvale._id}`} ><i class="far fa-file-alt text-success">View</i></a>
         </li>
         <li className="nav-item">
           <a className="nav-link" href={`/edit/${currentvale._id}`}> <i className="fas fa-pencil-alt text-primary"> Edit</i> </a>
         </li>
         <li className="nav-item">
           <a className="nav-link" href="#" onClick={()=> {this.deleteContent(currentvale._id) }} ><i class="far fa-trash-alt text-danger">Delete</i> </a>
         </li>
         
       </ul>]
         
        //  [<MDBLink className="col-md-3" to={`/edit/${currentvale._id}`}  link> Edit</MDBLink>,
        //   <MDBLink className="col-md-3" to={'#'}  onClick={()=> {this.deleteContent(currentvale._id) }} link>Delete</MDBLink>, 
        //   <MDBLink className="col-md-3" to={`/show/${currentvale._id}`}  link>View</MDBLink>]
         
         //<Link to={'/edit/'+currentvale._id}>edit</Link> | <a href="#" > Delete</a> | <Link to={`/show/${currentvale._id}`}>View</Link>;
        finalValue.push(temp);

      }
      )
      this.setState({ rows: finalValue });
    
    }
deleteContent(id){
//start here

mobiscroll.confirm({
  title: 'Are you sure',
  okText: 'yes',
  cancelText: 'No',
  callback: (res) => {
      mobiscroll.toast({
          message: res ? (axios.delete('http://localhost:5000/content/'+id).then(res =>{this.setState({contents: this.state.contents.filter(el=>el._id !== id)
        })
        this.dataBuilder(this.state.contents);
      }
        
        )) : 'Delete process Cancelled'
      });
     }
});

//end here
 
}




    dataBuilder = (contents) => {
      const tempData = { ...this.state.data };
      this.rowdata(contents);
      tempData.rows = this.state.rows;
      this.setState({ data: tempData });
    }
  
  

  render(){
  
    const { data } = this.state;
     

  return (
    
   <div className="container" style={{fontFamily : "serif"}}>
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
    </div>
   
  );
}

}

export default DatatablePage;