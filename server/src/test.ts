import * as msgService from "./mysql/service/msgService";
import * as groupService from "./mysql/service/groupService";
import * as userGroupService from "./mysql/service/userGroupService";
import * as userService from "./mysql/service/userService";

userService.deletUserById(5).then((e) => console.log(e));
userService.deletUserById(6).then((e) => console.log(e));
userService.deletUserById(7).then((e) => console.log(e));
userService.deletUserById(8).then((e) => console.log(e));
