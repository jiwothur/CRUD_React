import React, {Component} from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props){
      super(props);
      this.max_content_id = 3;
      this.state ={
        mode : "welcome",
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
  getReadContent(){
    var i=0;
    var data = Array.from(this.state.contents);
    while(i<this.state.contents.length){
      if(data[i].id === this.state.select_content_id){
        return data[i];
      }
      i++;
    }
  }
  getDeleteContent(){
    var i=0;
    var _contents = Array.from(this.state.contents);
    while(i<this.state.contents.length){
      if(_contents[i].id === this.state.select_content_id){
        _contents.splice(i,1);
         break;
      }
      i++;
    }
    this.setState({contents:_contents, mode:'welcome'});

  }
  getContent(){
    var _title, _desc,_article,_content = null;
    if(this.state.mode ==='welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc ={_desc}/>;   
    }else if(this.state.mode ==='read')
    {
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc ={_content.desc}/>;   
    }
    else if(this.state.mode ==='create')
    {
      _article = <CreateContent onSubmit={(_title,_desc)=>{
        this.max_content_id++;
        debugger;
        var _contents = Array.from(this.state.contents);
        _contents.push({ id:this.max_content_id,
          title:_title,
          desc:_desc});
          this.setState({contents:_contents, mode:'welcome'});
      }}  
     />;   
    }
    else if(this.state.mode ==='update')
    {
      _content = this.getReadContent();
      _article = <UpdateContent 
      data = {_content}
      onSubmit={(_id,_title,_desc)=>{
        var _contents = Array.from(this.state.contents);
        var i =0;
        while(i<_contents.length){
          if(_contents[i].id ===_id){
            _contents[i] = {id:_id, title:_title, desc:_desc}
            break;
          }
          i++;
        }
        this.setState({contents:_contents, mode:'read'});
      }}  
     />;   
    }
    else if(this.state.mode ==='delete')
    {
      if(window.confirm('really?')){
        this.getDeleteContent();
        this.max_content_id--;
      }
    }

    return _article;
  }
  render(){
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
      {this.getContent()}
      </div>
    );
  }
}

export default App;
