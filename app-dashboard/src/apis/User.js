import Api from "./Api";

export default {
  register(form) {
    return Api().post("/users", form);
  },
  login(form) {
    return Api().post("/auth/login", form);
  },
  auth() {
    return Api().get("/profile");
  },
  saveUser(id, user) {
    return Api().patch("/users/" + id, user);
  },
  resetPassword(id, pass) {
    return Api().patch("/users/" + id, pass);
  },
  addWidget(id, widget) {
    return Api().post("/widgets/" + id, { widget });
  },
  saveWidget(id, widget) {
    return Api().patch("/widgets/" + id, { widget });
  },
  getWidgets(userId) {
    return Api().get("/widgets/" + userId);
  },
  setWidgetsPosition(widgets) {
    return Api().patch("/widgets/", { widgets });
  },
};
