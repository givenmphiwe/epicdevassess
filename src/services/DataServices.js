import http from "../http-common";
class DataService {
  getAll() {
    return http.get("/Home-list");
  }
  get(id) {
    return http.get(`/Home-list/${id}`);
  }
  create(data) {
    return http.post("/Home-list", data);
  }
  update(id, data) {
    return http.put(`/Home-list/${id}`, data);
  }
  deleteA(id) {
    return http.delete(`/Home-list/${id}`);
  }
  deleteAll() {
    return http.delete(`/Home-list`);
  }
  findByTitle(title) {
    return http.get(`/Home-list?title=${title}`);
  }
}
export default new DataService();