export default class user{
    constructor (id,name,moderator,admin,banned){
        this.id=id;
        this.name=name;
        this.moderator=moderator === undefined ?  false : moderator;
        this.admin=admin === undefined ?  false : admin;
        this.banned=banned === undefined ?  false : banned;
    }
}