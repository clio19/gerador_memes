import  React, {Component}  from "react";

class MemeGenerator extends Component {

    constructor() {
        super()
        this.state = {            
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImages: []
        }
    }


    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then( response => response.json())
            .then(response => {
                const { memes } = response.data
                console.log(memes[0])
                this.setState({allMemeImages: memes})
            })
    }


    render () {
        return (
           <div>
               <form  className="mem-form">
                   <input 
                        type="text"
                        name="topText"
                        placeholder="Texto Superior"
                     />
                   <input
                        type="text"
                        name="bottomText"
                        placeholder="Texto Inferior"
                     />       
               </form>
           </div>        
        )
    }
    
}


export default MemeGenerator