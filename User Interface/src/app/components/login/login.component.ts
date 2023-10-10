// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
// import { Route, Router } from '@angular/router';
// import { NgToastService } from 'ng-angular-popup';
// import { AuthService } from 'src/app/services/auth.service';
// import { UserStoreService } from 'src/app/services/user-store.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit{

//   type:string = "password"
//   isText : boolean=false;
//   eyeIcon:string="fa-eye-slash";
//   loginForm! : FormGroup;

//   constructor(private fb:FormBuilder,
//     private auth:AuthService,
//     private router:Router,
//     private toast:NgToastService,
//     private userStore:UserStoreService){}
//   ngOnInit():void{
//     this.loginForm = this.fb.group({
//       username: ['',Validators.required],
//       password: ['',Validators.required],
//     })
//   }
//   hideShowPass(){
//     this.isText = !this.isText;
//     this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
//     this.isText? this.type="text" : this.type="password";
//   }
//   onLogin(){

  //   if(this.loginForm.valid)
  //   {
  //     console.log(this.loginForm.value)
  //     //send object to database
        // this.auth.login(this.loginForm)
  //     this.auth.login(this.loginForm.value).subscribe({
  //       next:(res)=>{
  //         alert(res.message);
  //         console.log(res.message)
  //         this.loginForm.reset();
  //         this.auth.storeToken(res.token)
  //         const tokenPayload = this.auth.decodedToken();
  //         this.userStore.setfullNameForStore(tokenPayload.name)
  //         this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000})
  //         this.router.navigate(['dashboard']);
  //       },
  //       error:(err)=>{
  //         alert(err?.error.message)
  //         this.toast.error({detail:"ERROR",duration:5000})
  //       }
  //     })
  //   }
  //   else
  //   {
  //     //throw error
  //     console.log("Form is not valid")

  //     this.validateAllFormFields(this.loginForm);
  //     this.toast.error({detail:"ERROR",summary:"Something went wrong",duration:5000})
  //     //alert("Your form is invalid")
  //   }
  // }
  // private validateAllFormFields(formGroup:FormGroup){
  //   Object.keys(formGroup.controls).forEach(field=>{
  //     const control = formGroup.get(field);
  //     if(control instanceof FormControl){
  //       control.markAsDirty({onlySelf:true})
  //     }
  //     else if(control instanceof FormGroup){
  //       this.validateAllFormFields(control)
  //     }
  //   })
  // }

// }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = "fa-eye") : (this.eyeIcon = "fa-eye-slash");
    this.isText ? (this.type = "text") : (this.type = "password");
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Send the loginForm.value (username and password) to your authentication service
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => { // Specify the type of 'res'
          // alert(res.message);
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setfullNameForStore(tokenPayload.name);
          this.toast.success({
            detail: "SUCCESS",
            summary: res.message,
            duration: 5000
          });
          this.router.navigate(['dashboard']);
        },
        error: (err: any) => { // Specify the type of 'err'
          alert(err?.error.message);
          this.toast.error({ detail: "ERROR", duration: 5000 });
        }
      });
    } else {
      // Form is not valid, you can uncomment the validation code if needed
      console.log("Form is not valid");
      // this.validateAllFormFields(this.loginForm);
      this.toast.error({ detail: "ERROR", summary: "Something went wrong", duration: 5000 });
    }
  }
  

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
