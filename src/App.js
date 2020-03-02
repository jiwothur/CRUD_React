import React, {Component} from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props){
      super(props);
      this.max_content_id = 3;
      this.state ={
        mode : "create",
        select_content_id : 1,
        subject:{
          title: "CRUD",
          sub: "Create Read Update Delete"
        },
        welcome:{title:'Welcome', desc: "Hello, React!!"},
        contents:[
          {
           id: 1, title:'HTML', desc: 'HTML is for information'
          },
          {
           id: 2, title:'CSS', desc: 'CSS is for design'
          },
          {
           id: 3, title:'JavaScript', desc: 'JavaScript is for interactive'
          }
      ]
      }
  }
  
  render(){
    var _title, _desc,_article = null;
    if(this.state.mode ==='welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc ={_desc}/>;   
    }else if(this.state.mode ==='read')
    {
      var i=0;
      while(i<this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.select_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++;
      }
      _article = <ReadContent title={_title} desc ={_desc}/>;   
    }
    else if(this.state.mode ==='create')
    {
      _article = <CreateContent onSubmit={(_title,_desc)=>{
        this.max_content_id++;
        var _contents = this.state.contents.concat({
          id:this.max_content_id,
          title:_title,
          desc:_desc
        });
        this.setState({contents:_contents})
      }}  
     />;   

    }
    return (
      <div>
       <Subject 
       title={this.state.subject.title} 
       sub={this.state.subject.sub}
       onChangePage={() => {
         this.setState({mode: 'welcome'});
       }}
       />
       <TOC 
       data ={this.state.contents}
       onChangePage={(id) => {
        this.setState({
          mode: 'read',
          select_content_id: Number(id)
            });
      }}
      />
      <Control
      
      onChangeMode = {(_mode) =>{
          this.setState({mode:_mode});
      }}
      />
      {_article}
      </div>
    );
  }
}

export default App;
