import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserState } from '../../account/store/states/user.state';
import { AuthStatusState } from '../../account/store/states/auth-status.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  signedIn = false;
  state = "";
  stateLocked = false;

  constructor(
    private readonly _store: Store
  ) {
    _store.select(AuthStatusState.getSignedIn).subscribe(val => this.signedIn = val);
  }

  ngOnInit(): void {
  }

  toggleState(name: string){
    if(this.stateLocked && this.state == name){
      this.state = "";
      this.stateLocked = false;
    }else{
      this.state = name;
      this.stateLocked = true;
      document.addEventListener("mousedown", this.obj);
    }
  }

  obj = (event: MouseEvent) => {
    if(!this.parentHasClass(event.target, this.state)){
      this.toggleState(this.state);
      //remove Event Listener for performance and memory.
      document.removeEventListener("mousedown", this.obj, false);
    }
  };

  showPop(name:string){
    if(!this.stateLocked)
      this.state = name;
  }

  hidePop(event: MouseEvent, name: string){
    if(!this.stateLocked && !this.parentHasClass(event.relatedTarget, name + "-act"))
        this.state="";
  }

  parentHasClass(element, classname){
    if(element.className && element.className.includes(classname))
      return true;
    return element.parentNode && this.parentHasClass(element.parentNode, classname);
  }

  updateUser(){
  }

}
