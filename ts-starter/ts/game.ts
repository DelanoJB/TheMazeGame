class Game {
    
    private el : Element = document.querySelector('#body');
    private name : string = 'Whack the Mole';
    private allHoles : Array<Hole> = [];
    private mole : Mole = new Mole(this.allHoles, 'mole'); 
    private timeUp : boolean; 

    constructor(){
        for (let i = 0; i < 6; i++) {
            this.allHoles[i] = new Hole(i);
        }
        console.dir(this.allHoles);
        this.render();
    }

//creating the div and placing it in the body 
    private render():void{
        const div = document.createElement('div');
        div.className = 'game'; 
        div.addEventListener('click', this.clickHandler); 
        this.el.appendChild(div);

//creating the hole's 
        for (let i = 0; i < 6; i++) {
        this.allHoles[i].render(); } 

//creating the buttons
        const button = document.createElement('button'); 
        button.id = 'start'; 
        button.innerHTML = 'start'; 
        this.el.appendChild(button); 

//starting the game
        document.addEventListener("click", this.startHandler);        
        
            
    }

    private startHandler = (event:Event):void => { 
        console.log(this); 
        this.timeUp = false; 
        this.loop();
        setTimeout(
            () => {
                 this.timeUp = true; 
            }, 
            10000 
            ); 
          }

    private randomTime(min : number, max : number):number{
        return Math.round(Math.random() * (max - min) + min); 
    }

    private clickHandler = (event : Event) => {
            
            if(event.srcElement.className == 'mole up'){ 
                    console.log('verklikt'); 
            }
        
    }
    
//render a mole
    private loop(){
        const time = this.randomTime(200, 1000); 
        this.mole.render();
        setTimeout(
            ()=>{ 
                    if(!this.timeUp) this.loop() 
                },
                time 
            ); 
    }

}