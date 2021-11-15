function Update(){
if(Input.GetKeyDown(KeyCode.Space)){
    creditsobject = GameObject.FindWithTag("Creditsandhelp").transform;
    Destroy(creditsobject.gameObject);
}
}
