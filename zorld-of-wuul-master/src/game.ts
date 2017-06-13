/**
 * This class is part of the "Zorld of Wuul" application. 
 * "Zorld of Wuul" is a very simple, text based adventure game.  
 * 
 * Users can walk around some scenery. That's all. It should really be 
 * extended to make it more interesting!
 * 
 * To play this game, create an instance of this class and call the "play"
 * method.
 * 
 * This main class creates and initialises all the others: it creates all
 * rooms, creates the parser and starts the game.  It also evaluates and
 * executes the commands that the parser returns.
 * 
 * @author  Michael Kölling, David J. Barnes and DellyBird
 * @version 2017.03.30
 */


    class Game {
    parser : Parser;
    out : Printer;

    currentRoom : Room;

    isOn : boolean;    

    public hunger : number = 50;

    private _rooms: Array <Room> = []; 
    private _desc: Array <string> = [
                               //0-4
                               "at the start of the maze",
                               "on your way to the exit",
                               "almost at the exit",
                               "almost at the exit but you are blocked by steel bars",
                               "on the edge of the desert",
                               //5-9
                               "wishing you didnt enter the swamp",
                               "waiting for a alligator to pass",
                                "now standing in a dry spot",
                               "at the edge of the dry spot, when you look forward you see more swamp and decide to not go there",
                               "near the hills",
                               //10-14
                               "now in the hills, it feels refresh after spending time in the swamp",
                               "wandering ontop of the highest hill you could find but you can't see anything through the clouds",
                               "now north of the swamo but you can still smell it",
                               "eager to sleep when you see the bed in the ruined house", 
                               "erasing some foul words on a rock", 
                               //15-19
                               "eating some dirt, it doens't satisfy you", 
                               "searching for some water in this desert", 
                               "eating some sand now, it tastes better then the dirt but it left a dry taste in your mouth", 
                               "escaping from a sinkhole", 
                               "smelling a cactus", 
                               //20-24
                               "sad that you didnt find a camel", 
                               "starting to notice a familiar area", 
                               "eating a piece of rock, why do you keep doing this?", 
                               "starting to notice that the forest grows denser", 
                               "following the green moss on the trees for some reason",
                               //25-29 
                               "wondering why it sounded like a good idea to follow moss...", 
                               "looking at a wandering camel that reminds you of someone",
                               "next to a tree filled with baboons, they dont seem to like you", 
                               "eating a piece of tree bark, the hunger is getting worse", 
                               "smelling something that you think is food", 
                               //30-34
                               "walking towards a dark cave", 
                               "suspicious of the cave because doesnt look so scary, yet",
                               "smelling a scent that smells familiar",
                               "walking in the dark", 
                               "walking towards the exit",
                               //35-39
                               "finally at the exit of this damned maze, congratulations you escaped (press F5 to restart the game)",
                               "on the edge of the desert but somethings feels odd", 
                               "finally at the exit of the swamp and see a strange light",
                               "in some weird hut with a cauldron in it, you decide to take a sip because you are hungry",
                               "on the floor losing consciousness, you fell", 
                               //40-44
                               "chewing on some mushrooms you found", 
                               "drinking from a cactus", 
                               "running away from the baboons", 
                               "running away from the baboons", 
                               "running away from the baboons", 
                               //45-47
                               "lost in the forest and you ask a very hairy old lady for directions",
                               "lost in the dark but you see some light", 
                               "bamboozled again because the light was a lie",                               

                               ]; 

    //give room numbers instead of directions (north east south west)                           
    private _exits = [//Rooms 0-4
                      [4, null, 1, 5],
                      [0, null, 2, null],
                      [1, null, 3, null],
                      [2, null, null, null],
                      [36, null, 0 ,null],
                      // Rooms 5-9
                      [null, 0, null, 6],
                      [null, 5, null, 7],
                      [9, 6, 37, 8],
                      [38, 7, null, null],
                      [10, null, 7, 38],
                      //Rooms 10-14
                      [11, 39, 9, null],
                      [null, 40, 10, 12],
                      [13, 11, null, null],
                      [null, 14, 12, null], 
                      [null, 15, null, 13], 
                      //Rooms 15-19
                      [null, 16, 40, 14],
                      [null, null, 17, 15],
                      [16, 18, 41, null],
                      [null, 19, 36, 17],
                      [null, null, 20, 18], 
                      //Rooms 20-24
                      [19, null, 21, 36],
                      [20, null, 22, null],
                      [21, 23, null, null], 
                      [24, 45, 28, 22],
                      [null, 25, 23, null], 
                      //Rooms 25-29
                      [26, null, 45, 24], 
                      [27, null, 25, null],
                      [43, 44, 26, 42], 
                      [23, 29, null, null], 
                      [45, null, 30, 28], 
                      //Rooms 30-35
                      [29, null, 46, 31], 
                      [null, 30, 32, null], 
                      [31, 46, 33, null], 
                      [32, 47, null, 34], 
                      [null, 33, null, 35],
                      [null, null, null, null],  
                      //Trap Rooms 36-40
                      [0,0,0,0], 
                      [0,0,0,0], 
                      [0,0,0,0], 
                      [0,0,0,0], 
                      [0,0,0,0], 
                      //Trap Rooms 41-45
                      [0,0,0,0], 
                      [0,0,0,0], 
                      [0,0,0,0], 
                      [0,0,0,0], 
                      [0,0,0,0],
                      //Trap Rooms 46-47
                      [0,0,0,0], 
                      [0,0,0,0], 
                       ];
                
    /**
     * Create the game and initialise its internal map.
     */
    constructor(output: HTMLElement, input: HTMLInputElement) {
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
    }

    /**
     * Create all the rooms and link their exits together.
     */
    createRooms() : void {
        // create the rooms
        for (let i=0; i<51; i++){
            this._rooms.push(new Room(this._desc[i])); 
        }  

        console.dir(this._rooms); 

    
        // initialise room exits (north, east, south, west) 
        for(let i = 0; i < 47; i++) {
            this._rooms[i].setExits(
               this._rooms[this._exits[i][0]],
               this._rooms[this._exits[i][1]],
               this._rooms[this._exits[i][2]],
               this._rooms[this._exits[i][3]],
            );
        }

        this.currentRoom= this._rooms[0];  
        
    }

    /**
     * Print out the opening message for the player.
     */
    printWelcome() : void {
        this.out.println();
        this.out.println("Welcome to the Maze");
        this.out.println("The Maze is a strange place between you and your final destination");
        this.out.println("Type 'help' if you need help.");
        this.out.println();
        this.out.println("You are " + this.currentRoom.description);
        this.out.print("Exits: ");
        if(this.currentRoom.northExit != null) {
            this.out.print("north ");
        }
        if(this.currentRoom.eastExit != null) {
            this.out.print("east ");
        }
        if(this.currentRoom.southExit != null) {
            this.out.print("south ");
        }
        if(this.currentRoom.westExit != null) {
            this.out.print("west ");
        }
        this.out.println();
        this.out.print(">");
    }

    gameOver() : void {
        this.isOn = false;
        this.out.println("You died of starvation");
        this.out.println("Hit F5 to restart the game");
    }

    
   


}