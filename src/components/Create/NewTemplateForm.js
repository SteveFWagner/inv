import React, {Component} from 'react'


class newTemplateForm extends Component{
    constructor(props){
        super(props)
        this.state={
            name:``,
            materials:{}
        }
    }
    render(){
        return(
            <div>
                <input placeholder='Name Hello my name is'/>
                <input placeholder='NAME HELLO MY NAME IS'/>
            </div>
        )
    }
}
export default newTemplateForm 