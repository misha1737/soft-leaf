export default class user{
    constructor (id,name,phone,photo,moderator,admin,banned){
        this.id=id;
        this.name=name;
        this.phone=phone;
        this.photo=photo;
        this.moderator=moderator === undefined ?  false : moderator;
        this.admin=admin === undefined ?  false : admin;
        this.banned=banned === undefined ?  false : banned;
    }
}