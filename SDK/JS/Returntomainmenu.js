	
function OnGUI(){
if (GUI.Button (Rect (0,0,800,20), "Return to the main menu")) {
    Debug.Log("clicked credits");
    Application.LoadLevel(0);
}
}
