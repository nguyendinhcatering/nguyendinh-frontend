import Axios from "axios";
import { isEmpty } from "lodash";

const axios = Axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });

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

  static async sendContactEmail(payload) {
    try {
      const response = await axios.post(`/mails/contact`, payload);

      console.log(response.data);
      return null;
    } catch {
      return null;
    }
  }

  static async download(url) {
    try {
      const response = await axios.get(`${url}`, {
        responseType: "blob",
      });

      const newUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = newUrl;
      link.setAttribute("download", url.split(/([\\|\/])/g).pop());
      document.body.appendChild(link);
      link.click();

      return null;
    } catch {
      return null;
    }
  }

  static async getFoodCategories() {
    try {
      const response = await axios.get("/food-categories");

      if (response.data) {
        return response.data;
      }

      return [];
    } catch (err) {
      return [];
    }
  }

  static async getFoodPresetTypes() {
    try {
      const response = await axios.get("/food-preset-types");

      if (response.data) {
        return response.data;
      }

      return [];
    } catch (err) {
      return [];
    }
  }

  static async getFoodPresetType(slug) {
    try {
      const response = await axios.get(`/food-preset-types?slug=${slug}`);

      if (response.data && !isEmpty(response.data)) {
        return response.data[0];
      }

      return null;
    } catch (err) {
      return null;
    }
  }

  static async getFoodPresetsByPresetTypeSlug(slug) {
    try {
      const response = await axios.get(
        `/food-presets?foodPresetType.slug=${slug}`
      );

      if (response.data) {
        return response.data;
      }

      return [];
    } catch (err) {
      return [];
    }
  }
}
