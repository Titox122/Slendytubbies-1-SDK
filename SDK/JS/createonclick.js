var clicked : boolean = false;
var spawn : Transform;

function OnMouseDown() {
    clicked = !clicked;
    Instantiate(spawn, transform.position, transform.rotation);
    }