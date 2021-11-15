using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour
{
    // Use this for initialization
    void Start()
    {
		// destroy all character controller components if this player does not belong to the host
		// otherwise user input will be trying to controll all players
		if(!this.networkView.isMine)
		{
			Destroy(this.GetComponent<FPSInputController>());
			Destroy(this.GetComponent<CharacterMotor>());
			Destroy(this.GetComponent<CharacterController>());
			Destroy(this.GetComponent<MouseLook>());
		}
    }
}
