using UnityEngine;
using gui = UnityEngine.GUILayout;


public class GameMenusingleplayer : MonoBehaviour
{
    public GameObject PlayerPrefab;
	public GameObject TinkyPrefab;
    string ip = "127.0.0.1";
	
	public void Awake()
	{
		Application.runInBackground = true;
	}

    public void CreatePlayer()
    {
        connected = true;
        var g = (GameObject)Network.Instantiate(PlayerPrefab, transform.position, transform.rotation, 1);
		g.networkView.stateSynchronization = NetworkStateSynchronization.Unreliable;
        g.transform.Find("Camera").GetComponent<Camera>().enabled = true;
        camera.enabled = false;
  }
	
    void OnDisconnectedFromServer()
    {
        connected = false;
    }
    void OnPlayerDisconnected(NetworkPlayer pl)
    {
        Network.DestroyPlayerObjects(pl);
    }
    void OnServerInitialized()
    {
        CreatePlayer();
    }
    bool connected;
    void OnGUI()
    {
        if (!connected)
        {
            if (gui.Button("Start"))
            {
                Network.InitializeServer(10, 5300, false);
            }
        }
    }
	void Start () {
		Network.InitializeServer(10, 5300, false);
	}
}