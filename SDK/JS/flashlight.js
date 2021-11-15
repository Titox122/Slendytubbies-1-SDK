var flashlight : GameObject;
var switchsound : AudioClip;

var myLight : Light = flashlight.GetComponent("Light");
function Update()
{

if (Input.GetKeyDown("f"))
{
   myLight.enabled = !myLight.enabled;
   audio.PlayOneShot(switchsound);

}
if (Input.GetMouseButtonDown(1))
{
   myLight.enabled = !myLight.enabled;
   audio.PlayOneShot(switchsound);

}
}