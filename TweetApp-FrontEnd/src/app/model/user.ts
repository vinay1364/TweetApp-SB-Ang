export class User {
    id: string;
    first_name: string;
    last_name: string;
    gender: string;
    dob : string;
    email : string;
    password : string;
    contactNumber : string;

    constructor(id:string, first_name:string, last_name:string, gender:string,
         dob:string, email:string, password:string, contactNumber : string){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.dob = dob;
        this.email =  email;
        this.password = password;
        this.contactNumber = contactNumber;
    }
}
