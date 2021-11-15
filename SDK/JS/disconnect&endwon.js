var timeOut = 5.0;
var detachChildren = false;

function Awake ()
{
	Invoke ("DestroyNow", timeOut);
}

function DestroyNow ()
{
	if (detachChildren) {
		transform.DetachChildren ();
	}
	        Network.Disconnect();
        MasterServer.UnregisterHost();
        Application.LoadLevel(10);
        
}