import Axios from "axios";

const axios = Axios.create({baseURL: process.env.NEXT_PUBLIC_BACKEND_URL});

export default class API {
  static async getLayoutData() {
    const menus = await API.getMenus();
    const footer = await API.getFooter();

    return {
      menus,
      footer,
    };
  }

  static async getMenus() {
    try {
      return (await axios.get("/menus?_sort=order:ASC,url:ASC")).data;
    } catch {
      return [];
    }
  }

  static async getFooter() {
    try {
      return (await axios.get("/footer")).data;
    } catch {
      return [];
    }
  }

  static async getPage(url) {
    try {
      const encodedUrl = encodeURI(url);

      const response = await axios.get(`/pages/by-url?url=${encodedUrl}`);

      if (response.data && response.data.length > 0) {
        return response.data[0];
      }

      return null;
    } catch {
      return null;
    }
  }
}
