import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string="";
  password: string="";
  //formData: FormGroup | undefined;
  formData = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  constructor(private authService : AuthService, private router : Router) { }
 
  ngOnInit(): void {
   
    
  /*onClickSubmit(data: any) {
    this.userName = data.userName;
    this.password = data.password;

    console.log("Login page: " + this.userName);
    console.log("Login page: " + this.password);

    this.authService.login(this.userName, this.password)
       .subscribe((data: string) => { 
          console.log("Is Login Success: " + data); 
    
         if(data) this.router.navigate(['/home']); 
    });
 }
 */

}

submitForm() {
  if (this.formData.invalid) {
    return;
  }

this.authService
.login(this.formData.get('username')?.value!, this.formData.get('password')?.value!)
.subscribe((response) => {
  if (response.statusCode==200){
    console.log("khedmettttt");
  }
  else {
    console.log("errrrr");
  }
 //this.router.navigate(['/dashboard']);
 
});

}
}

