var flashlight : GameObject;
var switchsound : AudioClip;

var myLight : Light = flashlight.GetComponent("Light");
function Update()
{

if(networkView.isMine){
if (Input.GetKeyDown("n"))
{
   myLight.enabled = !myLight.enabled;
   audio.PlayOneShot(switchsound);

}
}
}