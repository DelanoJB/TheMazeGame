class Help extends Command{

 execute(params : string[]) : boolean {
        if(params.length > 0) {
            this.game.out.println("Help what?");
            return false;
        }
        this.game.out.println("You can see the exit in the south");
        this.game.out.println();
        this.game.out.println("Your command words are:");
        this.game.out.println("   go hunger help");
        return false;
    }


} 