class Hole{
    //add 1 attribute
    private id : number; 
    
    constructor(id:number){
            this.id = id; 
    }

    public getId():number{
        return this.id; 
    }

    public render(){
        //create div element
      const parent = document.querySelector('.game');
      const div  = document.createElement('div');
      div.classList.add('hole', 'hole'+this.id);
      
      parent.appendChild(div);
    }

}