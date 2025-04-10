import "./style.css";
import { logicController } from "./logic-controller";

logicController.addProject("proj 1");
logicController.addProject("proj 2");

for (let i = 0; i < logicController.getLength(); i++) {
    console.log(logicController.getProjectAt(i).getName());
}