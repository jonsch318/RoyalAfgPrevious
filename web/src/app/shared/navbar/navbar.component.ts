import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { GetUser } from '../../store/actions/user.actions';
import { selectIsLoggedIn } from '../../store/selectors/user.selector';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  signedIn = false;
  state = "";
  stateLocked = false;
  user: IUser;

  constructor(
    private readonly _store: Store<IAppState>
  ) {
    this._store.select(selectIsLoggedIn).subscribe((val) => {
        console.log("The user signed in: " + val);
        this.signedIn = val;
    })
    this._store.subscribe(state => {
      console.log("User changed: " + state.user.user.username);
      this.user = state.user.user
    })
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
    this._store.dispatch(new GetUser());
  }

}
