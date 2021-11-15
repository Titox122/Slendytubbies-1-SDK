    var accel = 0.8;
    var inertia = 0.9;
    var speedLimit = 10.0;
    var minSpeed = 1.0;
    var stopTime = 1.0;
     
    private var currentSpeed = 0.0;
     
    private var functionState = 0;
    private var accelState : boolean;
    private var slowState : boolean;
     
    private var waypoint : Transform;
    var rotationDamping = 6.0;
    var smoothRotation = true;
    var waypoints : Transform[];
    private var WPindexPointer : int;
     
     
    function Start ()
    {
        functionState = 0;     
    }
     
     
    function Update ()
    {
        if (functionState == 0)
        {
            Accell ();
        }
        if (functionState == 1)
        {
            Slow ();
        }
        waypoint = waypoints[WPindexPointer];
    }
     
     
    function Accell ()
    {
        if (accelState == false)
        {                        
            accelState = true;   
            slowState = false;   
        }                        
        if (waypoint)
        {
            if (smoothRotation)
            {
                var rotation = Quaternion.LookRotation(waypoint.position - transform.position);
                transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * rotationDamping);
            }
        }
        currentSpeed = currentSpeed + accel * accel;
        transform.Translate (0,0,Time.deltaTime * currentSpeed);
       
        if (currentSpeed >= speedLimit)
        {
            currentSpeed = speedLimit;
        }
    }
     
     
    function OnTriggerEnter ()
    {
        functionState = 1;
        WPindexPointer++;  
       
        if (WPindexPointer >= waypoints.Length)
        {
            WPindexPointer = 0;
        }
    }
     
     
    function Slow ()
    {
        if (slowState == false)
        {                      
            accelState = false;
            slowState = true;   
        }                      
       
        currentSpeed = currentSpeed * inertia;
        transform.Translate (0,0,Time.deltaTime * currentSpeed);
       
        if (currentSpeed <= minSpeed)
            {
            currentSpeed = 0.0;
            yield WaitForSeconds (stopTime);
            functionState = 0;
        }
    }