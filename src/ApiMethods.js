import { Buffer } from 'buffer';

export default class Methods {

  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = 'https://final-full-stack-backend.herokuapp.com/api' + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64'); 
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, {username, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return true;
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.validationErrors;
      });
    }
    else {
      throw new Error();
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async getCourses() {
    const response = await this.api('/courses');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async createCourse(course) {
    const response = await this.api('/courses', 'POST', course);
    if (response.status === 201) {
      return true;
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.validationErrors;
      });
    }
    else {
      throw new Error();
    }
  }

  async updateCourse(id, course, username, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {username, password});
    if (response.status === 204) {
      return true;
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.validationErrors;
      });
    }
    else {
      throw new Error();
    }
  }

  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {username, password});
    if (response.status === 204) {
      return true
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.validationErrors;
      });
    }
    else {
      throw new Error();
    }
  }

}  