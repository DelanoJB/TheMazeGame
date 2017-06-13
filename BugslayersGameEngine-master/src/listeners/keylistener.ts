/**
 * This class handles the keyboard events. It knows the last known state of its keys
 * 
 * Some parts of this class are pretty complex, but the class itself is fairly easy to use.
 * 
 * @author BugSlayer
 */
class KeyListener
{
    /**
     * TODO: Implement some useful attributes
     */

    /**
     * Constructs a new MouseListener.
     */
    constructor() {
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("onkeyup", this.keyUp);
        window.addEventListener("keypress", this.keyPress);
    }

    /**
     * Listen to the mouse state.
     * 
     * @param interval the time interval between this call and the previous
     */
    public listen(interval: number) : void
    {
        // Nothing to do. Mouse events are handled somewhere else
    }

    /**
     * Lambda that catches mouseDown events
     */
    keyDown = (ev: KeyboardEvent) => {
        // TODO: handle this event
    }

    /**
     * Lambda that catches mouseUp events
     */
    keyUp = (ev: KeyboardEvent) => {
        // TODO: handle this event
    }

    /**
     * Lambda that catches mouseMove events
     */
    keyPress = (ev: KeyboardEvent) => {
        // TODO: handle this event
    }

}