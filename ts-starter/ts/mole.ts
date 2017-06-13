class Mole {

    //attributes
    private className : string;
    private lastHole : Hole;
    private allHoles : Array<Hole>; 


    constructor(holes : Array<Hole>, className: string){
        this.allHoles = holes; 
        this.className = className; 

    }

     private randomHole() : Hole{
        const idx = Math.floor(Math.random() * this.allHoles.length); 
        const hole = this.allHoles[idx]; 

            if(hole=== this.lastHole){
            return this.randomHole(); 
                    }
        this.lastHole = hole; 
        return hole; 

             }

    //methods   //pick a hole any hole
    public render() : void{
         console.log('molletje #');  
         console.log(this.lastHole);
         if(this.lastHole !== undefined){
            const remLastHole = document.querySelector('.hole'+this.lastHole.getId());
            remLastHole.innerHTML = '';
         }


        let currentHole = this.randomHole(); 
        const holeElement = document.querySelector('.hole' +currentHole.getId()); 
        const moleElement = document.createElement('div'); 
        moleElement.classList.add(this.className, 'up'); 

        holeElement.appendChild(moleElement); 
       
    }

   

}