import React,{Component} from 'react'
import {Table} from 'react-bootstrap'
import{Button, ButtonToolbar} from 'react-bootstrap'
import AddDepModal from './AddDepModal'
import EditDepModal from './EditDepartmentModal'
import {Navbar, Nav,Spinner} from 'react-bootstrap'
import axiosConfig from '../axiosconfig/axiosConfig';
const API_BASE_URL='http://7990eb1a.ngrok.io/api/v1/';
export default class Department extends Component{
    constructor(props){
        super(props);
        this.state = { deps:[] ,addModalShow : false, editModalShow: false,apiAlredycalled:false}
    }
    componentDidMount(){
        this.refreshList();
    }
    refreshList(){
if(this.state.apiAlredycalled === false){
    axiosConfig.get('vendors')
  .then((response) =>{
    // handle success
    console.log("response.data====>",response.data)
    this.setState({deps:response.data,apiAlredycalled:true})
  })
  .catch((error)=> {
    // handle error
    console.log("response.data error.message====>",error.message)
  })

}
   
    }
    componentDidUpdate(){
        this.refreshList();
    }

deleteDep(depid){
    if(window.confirm('Are you sure want to delete id: '+depid)){
            fetch(API_BASE_URL+'vendors'+depid,{
            method:'DELETE', 
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
    }
}

    render(){
        const{deps,depid,depname,depaddress1,depaddress2,depcity,depstate,deppincode,depphone}=this.state;
        let addModalClose =() => this.setState({addModalShow:false})
        let editModalClose =() => this.setState({editModalShow:false})
        if(deps.length>0){
            return( <div>
                <Navbar bg="light" expand="lg">
                  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                  <Navbar.Collapse id="basic-navbar-nav">
               <Nav>
                {/* <h1 className="display-4">  Vendors List </h1> */}
               <ButtonToolbar>
                   <divaddbutton varient='primary' onClick={()=>this.setState({addModalShow:true})}> 
                   
                   </divaddbutton>
                       <AddDepModal
                       show={this.state.addModalShow } onHide={addModalClose}/>
                   
               </ButtonToolbar>
               </Nav>
                  </Navbar.Collapse>
              </Navbar>
               <Table className="mt-4" striped bordered hover size ="sm">  
           
                   <thead>
                       <tr>
                          
                           <th>ShopName</th>
                           <th>Address_1</th> 
   
                           <th>Address_2</th>
                           <th>City</th>
                           <th>State</th>
                           <th>PinCode</th>
                           <th>Phone Number</th>
   
                       </tr>
                   </thead>
                  
                   <tbody>
                       {deps.map(dep=>
                       
                           <tr key ={dep.id}> 
                           <td><Nav.Link href="/addcategory/16">{dep.shopname}</Nav.Link></td>
                           <td>{dep.address1}</td>
                           <td>{dep.address2}</td>
                           <td>{dep.city}</td>
                           <td>{dep.state}</td>
                           <td>{dep.pincode}</td>
                           <td>{dep.phone}</td>
                           <td>
                       <ButtonToolbar>
                         
   
                           <Button className="mr-2" varient="info" onClick={()=>this.setState({editModalShow:true, depid:dep.id,depname:dep.shopname,
                               depaddress1:dep.address1,depaddress2:dep.address2, depcity:dep.city, depstate:dep.state, deppincode:dep.pincode, depphone:dep.phone})}>
                               Edit
                           </Button>
                           <asbuttondelete className="mr-2" onClick={()=>this.deleteDep(dep.id)}
                           variant="danger"></asbuttondelete>
                           <EditDepModal show = {this.state.editModalShow}
                           onHide={editModalClose} 
                           depid={this.state.depid}
                           depname={this.state.depname}
                           depaddress1 ={this.state.depaddress1}
                           depaddress2 ={this.state.depaddress2}
                            depcity ={this.state.depcity}
                            depstate ={this.state.depstate}
                             deppincode ={this.state.deppincode}
                              depphone ={this.state.depphone}
   
                           {...this.props}
                           />
                       </ButtonToolbar>
                           </td>
                           </tr>
                           )}
                   </tbody>
   
               </Table>
              
   
              
   
               </div>
           )
        }else{
            return (
                <Spinner animation="border" variant="primary" className="movetocenter"/>
            )
        }
        
    }
}