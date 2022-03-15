import React from 'react';
import Inputfield from './Inputfield';
import SubmitButton from './SubmitButton';
import Userstore from './store/Userstore';


class Logingform extends React.Component {

   constructor(props){
      super(props);
      this.state ={
         username:'',
         password:'',
         buttonDisabled: false
      }
   }

   setInputValue(property, val){
      val = val.trim();
      if(val.length >12)
      {
         return;
      }
      this.setState({
         [property]: val
      })
   }

   resetForm(){
      this.setState({
         username: '',
         password: '',
         buttonDisabled: false
      })
   }

   async dologin(){

      if(!this.state.username){
         return;
      }
      if(!this.state.password){
         return;
      }

      this.setState({
         buttonDisabled: true
      })

      try{
         let res = await fetch('/login', {
            method: 'post',
            headers: {
               'Accept': 'application/jason'
            },
            body: JSON.stringify({
               username: this.state.username,
               password: this.state.password
            })
         });

         let result = await res.jason();
         if(result && result.success){
            Userstore.isLoggedin = true;
            Userstore.username = result.username;
         }

         else if(result && result.success ===false )
         {
            this.resetForm();
            alert(result.msg);
         }
      }
      catch(e)
      {
         console.log(e);
         this.resetForm();
      }
   }

  render(){
   return (
      <div className='LogingForm'>

         Log in
         <Inputfield 
            type = 'text'
            placeholder = 'Username'
            value = {this.state.username ? this.state.username: ''}
            onChange={(val) => this.setInputValue('username', val)}
         />

         <Inputfield 
            type = 'password'
            placeholder = 'Password'
            value = {this.state.password ? this.state.password: ''}
            onChange={(val) => this.setInputValue('password', val)}
         />

         <SubmitButton
            text ='login'
            disabled ={this.state.buttonDisabled}
            onClick = {() => this.dologin()}
         />

      </div>
   );
}
}

export default Logingform;