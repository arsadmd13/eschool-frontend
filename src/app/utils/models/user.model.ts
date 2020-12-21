export class User {
  
  _id: string;
  name: string;
  email: string;
  role: number;
  dateofreg: string;
  subscription: any;

  constructor(user) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.dateofreg = user.dateofreg;
    this.subscription = user.subscription;
  }

  // get name() {
  //   let name = '';

  //   if (this.firstName && this.lastName) {
  //     name = this.firstName + ' ' + this.lastName;
  //   } else if (this.firstName) {
  //     name = this.firstName;
  //   } else if (this.lastName) {
  //     name = this.lastName;
  //   }

  //   return name;
  // }

}