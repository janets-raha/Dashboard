import Api from "./Api";

export default {

  getWidgets() {
    return Api().get("/widgets");
  },
  setWidgetsPosition(widgets) {
    return Api().patch("/widgets/", { widgets });
  },
};
