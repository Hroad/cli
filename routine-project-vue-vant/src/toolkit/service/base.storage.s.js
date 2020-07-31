/**
 * [Storage 本地存储模块]
 * @type {Object}
 */
class Storage{
    constructor(){
        this.instance=null;
        this.userData=null;
        this.name=window.location.hostname;
        this.type='html5';
    }
    static getInstance(){
        if(!this.instance){
            this.instance=new Storage();
        }
        return this.instance;
    }
    init(){
        if(!this.userData){
            if(window.localStorage){
            	this.userData=null;
            	this.type='html5';
            }else{
            	this.type='ie';
                try{
                    this.userData=document.createElement('INPUT');
                    this.userData.type='hidden';
                    this.userData.style.display='none';
                    this.userData.addBehavior('#default#userData');
                    document.body.appendChild(this.userData);
                    var expires=new Date();
                    expires.setDate(expires.getDate()+365);
                    this.userData.expires=expires.toUTCString();
                }catch(e){
                    return false;
                }
            }
         }
        return true;
    }
    //sessionStorage
    getSessionItem(key){
        if(!this.init()){
        	return;
        }
        if(this.type=='html5'){
        	return  window.sessionStorage.getItem(key);
        }else{
        	this.userData.load(this.name);
        	return this.userData.getAttribute(key);
        }
    }
     //sessionStorage
     setSessionItem(key,value){
        if(!this.init()){
        	return;
        }
        if(this.type=='html5'){
            window.sessionStorage.setItem(key,value);
        }else{
        	this.userData.load(this.name);
        	this.userData.setAttribute(key,value);
        	this.userData.save(this.name);
        }
    }
    //localStorage
    getLocalItem(key){
        if(!this.init()){
        	return;
        }
        if(this.type=='html5'){
        	return window.localStorage.getItem(key);
        }else{
        	this.userData.load(this.name);
        	return this.userData.getAttribute(key);
        }
    }
    //localStorage
    setLocalItem(key,value){
        if(!this.init()){
        	return;
        }
        if(this.type=='html5'){
        	window.localStorage.setItem(key,value);
        }else{
        	this.userData.load(this.name);
        	this.userData.setAttribute(key,value);
        	this.userData.save(this.name);
        }
    }
    //remove all by primary key
    remove(key){
        if(!this.init()){
        	return;
        }
        if(this.type=='html5'){
            window.localStorage.removeItem(key);
            window.sessionStorage.removeItem(key);
        }else{
        	this.userData.load(this.name);
        	this.userData.removeAttribute(key);
        	this.userData.save(this.name);
        }
    }

} 
let storage=Storage.getInstance();
export default storage;