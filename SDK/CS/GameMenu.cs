using UnityEngine;
using gui = UnityEngine.GUILayout;

public class GameMenu : MonoBehaviour
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
    void OnConnectedToServer()
    {
        CreatePlayer();
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
            ip = gui.TextField(ip);
            if (gui.Button("Connect as Victim"))
            {
                Network.Connect(ip, 250000);
            }
            if (gui.Button("Host as Victim"))
            {
                Network.InitializeServer(10, 250000, false);
            }
        }
    }
}