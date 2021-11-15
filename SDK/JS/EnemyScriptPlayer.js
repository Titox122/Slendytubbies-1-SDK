#pragma strict

public var thePlayer : Transform;
private var theEnemy : Transform;

var speed : float = 5.0;

var isOffScreen : boolean = false;
public var offscreenDotRange : float = 0.7;

var isVisible : boolean = false;
public var visibleDotRange : float = 0.8; // ** between 0.75 and 0.85 (originally 0.8172719) 

var isInRange : boolean = false;

public var followDistance : float = 3.0;
public var maxVisibleDistance : float = 25.0;

private var sqrDist : float = 0.0;

var health : float = 100.0;
var damage : float = 20.0;

var nearbyaudio : AudioClip;
var triggerTarget : GameObject;
var replacementTex : Texture;
var originalTex : Texture; 

var blackness : Texture2D;
var scare : Texture2D;

var endgamepopup : Transform;



function Start() 
{
    if ( thePlayer == null )
    {
       thePlayer = GameObject.FindWithTag("Player").transform;
    }

    theEnemy = transform;
}

function Update() 
{
thePlayer = GameObject.FindWithTag("Player").transform;
    // Movement : check if out-of-view, then move
    CheckIfOffScreen();

    // if is Off Screen, move
    if ( isOffScreen )
    {
       MoveEnemy();
    }
    else
    {
       // check if Player is seen
       thePlayer = GameObject.FindWithTag("Player").transform;
       CheckIfVisible();

       if ( isVisible )
       {
         // deduct health
         DeductHealth();

         // stop moving
         StopEnemy();
         
       }
       else
       {
         // check max range
         CheckMaxVisibleRange();

         // if far away then move, else stop
         if ( !isInRange )
         {
          MoveEnemy();
         }
         else
         {
          StopEnemy();
          
         }
       }
    }

}


function DeductHealth() 
{
    // deduct health
    health -= damage * Time.deltaTime;
    triggerTarget.renderer.material.mainTexture = replacementTex;
    
    if (!audio.isPlaying){
    audio.clip = nearbyaudio;
    audio.Play();
    }
    
    // check if no health left
    if ( health <= 0.0 )
    {
    Network.Instantiate(endgamepopup, transform.position, transform.rotation, 1);
    DestroyObject (gameObject);
       health = 0.0;
       Debug.Log( "YOU ARE OUT OF HEALTH !" );
          
          
       // Restart game here!
       //
    }
}


function CheckIfOffScreen() 
{
    var fwd : Vector3 = thePlayer.forward.normalized;
    var other : Vector3 = (theEnemy.position - thePlayer.position).normalized;

    var theProduct : float = Vector3.Dot( fwd, other );

    if ( theProduct < offscreenDotRange )
    {
       isOffScreen = true;
    }
    else
    {
       isOffScreen = false;
    }
}


function MoveEnemy() 
{
    // Check the Follow Distance
    CheckDistance();

    // if not too close, move
    if ( !isInRange )
    {
//nothing happens if player is not in sight lolwut
    }
    else
    {
       StopEnemy();
    }
}


function StopEnemy() 
{

    rigidbody.velocity = Vector3.zero;
}


function CheckIfVisible() 
{
    var fwd : Vector3 = thePlayer.forward.normalized;
    var other : Vector3 = ( theEnemy.position - thePlayer.position ).normalized;

    var theProduct : float = Vector3.Dot( fwd, other );

    if ( theProduct > visibleDotRange )
    {
       // Check the Max Distance
       CheckMaxVisibleRange();

       if ( isInRange )
       {
         // Linecast to check for occlusion
         var hit : RaycastHit;

         if ( Physics.Linecast( theEnemy.position, thePlayer.position, hit ) )
         {
          //Debug.Log( "" + hit.collider.gameObject.name );

          if ( hit.collider.gameObject.tag == "Player" )
          {
              isVisible = true;
          }
         }
       }
       else
       {
         isVisible = false;
       }
    }
    else
    {
       isVisible = false;
    }
}


function CheckDistance() 
{
    var sqrDist : float = (theEnemy.position - thePlayer.position).sqrMagnitude;
    var sqrFollowDist : float = followDistance * followDistance;

    if ( sqrDist < sqrFollowDist )
    {
       isInRange = true;
    }
    else
    {
       isInRange = false;
       triggerTarget.renderer.material.mainTexture = originalTex;
    }  
}


function CheckMaxVisibleRange() 
{
    var sqrDist : float = (theEnemy.position - thePlayer.position).sqrMagnitude;
    var sqrMaxDist : float = maxVisibleDistance * maxVisibleDistance;

    if ( sqrDist < sqrMaxDist )
    {
       isInRange = true;
    }
    else
    {
       isInRange = false;
    }  
}
