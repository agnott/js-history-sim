class IdentityService {
  constructor() {
    this.objects = [];
    this.classes = {};
  }

  register(obj) {
    if (obj.class in this.classes) {
      this.classes[obj.class].push(obj);
    } else {
      this.classes[obj.class] = [obj];
    }

    return this.objects.push(obj) - 1;
  }

  get(id) {
    return this.objects[id].data;
  }
}

module.exports = new IdentityService();
