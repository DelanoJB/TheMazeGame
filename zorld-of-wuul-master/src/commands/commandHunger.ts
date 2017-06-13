class Hunger extends Command{

    execute(params : string[]) : boolean {
        if(params.length > 0) {
            this.game.out.println("Hunger what?");
            return;
        }
//show you how much saturation you have left
        else if(params.length == 0){
            this.game.out.println("Saturation: " + this.game.hunger);
        }
    }
} 