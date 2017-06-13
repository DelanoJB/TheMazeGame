/*
* Default pattern for setting up an app.
*/

//this is my constant where game and events meet
const app : any = {};

//IIFC
(function ()
{
    /**
     * Run after dom is ready
     */
    let init = function ()
    {
        console.log('init');
        app.game = new Game();
    };

    window.addEventListener('load', init);
})();