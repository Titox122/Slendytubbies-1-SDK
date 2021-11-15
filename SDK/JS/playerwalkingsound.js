var walkingsound : AudioClip;

public var walkAnimation : AnimationClip;

function Update (){
Player = GameObject.FindWithTag("Player").transform;

audio.clip = walkingsound;
audio.loop = true;

if(Input.GetKeyDown(KeyCode.W)){
audio.Play();
audio.loop = true;
}    
if(Input.GetKeyUp(KeyCode.W)){
  audio.Stop();
    }

if(Input.GetKeyDown(KeyCode.S)){
audio.Play();
audio.loop = true;
}
if(Input.GetKeyUp(KeyCode.S)){
  audio.Stop();
    }
    
    if(Input.GetKeyDown(KeyCode.A)){
audio.Play();
audio.loop = true;
}   
if(Input.GetKeyUp(KeyCode.A)){
  audio.Stop();
    }
    
    if(Input.GetKeyDown(KeyCode.D)){
audio.Play();
audio.loop = true;
}    
if(Input.GetKeyUp(KeyCode.D)){
  audio.Stop();
    }
    if(Input.GetKeyDown(KeyCode.UpArrow)){
audio.Play();
audio.loop = true;
}    
if(Input.GetKeyUp(KeyCode.UpArrow)){
  audio.Stop();
    }

if(Input.GetKeyDown(KeyCode.DownArrow)){
audio.Play();
audio.loop = true;
}
if(Input.GetKeyUp(KeyCode.DownArrow)){
  audio.Stop();
    }
    
    if(Input.GetKeyDown(KeyCode.LeftArrow)){
audio.Play();
audio.loop = true;
}   
if(Input.GetKeyUp(KeyCode.LeftArrow)){
  audio.Stop();
    }
    
    if(Input.GetKeyDown(KeyCode.RightArrow)){
audio.Play();
audio.loop = true;
}    
if(Input.GetKeyUp(KeyCode.RightArrow)){
  audio.Stop();
    }
    
            
}
