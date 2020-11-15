import Axios from "axios";
import { isEmpty, isString } from "lodash";

const axios = Axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });

export default class API {
  static async getLayoutData() {
    const menus = await API.getMenus();
    const footer = await API.getFooter();
    const siteData = await API.getSiteData();

    return {
      menus,
      footer,
      siteData,
    };
  }

  static async getSiteData() {
    try {
      return (await axios.get("/site-generic-data")).data;
    } catch {
      return {};
    }
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

      return {
        sections: [],
        banners: [],
        metadata: {
          title: "Nguyên Đình",
        },
      };
    } catch {
      return {
        sections: [],
        banners: [],
        metadata: {
          title: "Nguyên Đình",
        },
      };
    }
  }

  static async sendContactEmail(payload) {
    try {
      const response = await axios.post(`/mails/contact`, payload);

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

  static async getOrderData() {
    try {
      const response = await axios.get(`/order-data`);

      if (response.data) {
        return response.data;
      }

      return {};
    } catch (err) {
      return {};
    }
  }

  static async placeOrder(pl) {
    try {
      const response = await axios.post("/orders", pl);

      if (response.data) {
        return response.data;
      }

      return {};
    } catch (err) {
      console.error(err);
    }
  }

  static async getOrderById(id, secret) {
    try {
      const sanitizedId = isString(id)
        ? Number(id.replace(/\D/g, ""))
        : undefined;

      if (!sanitizedId) {
        throw new Error("ID is not valid");
      }
      const response = await axios.get(
        `/orders/${sanitizedId}?secret=${secret}`
      );

      if (response.data) {
        return response.data;
      }

      return {};
    } catch (err) {
      console.error(err);
    }
  }

  static async getFoodItems() {
    try {
      const response = await axios.get("/food-menu-items?_limit=10000");

      return response.data;
    } catch (err) {
      return [];
    }
  }

  static async getNewsItem(id) {
    try {
      const response = await axios.get(`/news-items/${id}`);

      const newsItem = response.data;

      if (!newsItem) {
        return null;
      }

      if (newsItem && !newsItem.published) {
        return null;
      }

      return {
        ...newsItem,
        head: {
          ...newsItem.head,
          mediaPlacement: "newsItem",
          newsId: newsItem.id,
          newsUpdatedAt: newsItem.updated_at,
          newsTitle: newsItem.name,
        },
      };
    } catch (err) {
      return null;
    }
  }

  static async getNewsItems(limit = 5, page = 0) {
    try {
      const response = await axios.get(
        `/news-items?_limit=${limit}&_sort=updated_at:DESC&_start=${
          page * limit
        }&published=true`
      );

      return (response.data || []).map((newsItem) => ({
        ...newsItem,
        head: {
          ...newsItem.head,
          mediaPlacement: "newsItem",
          newsId: newsItem.id,
          newsUpdatedAt: newsItem.updated_at,
          newsTitle: newsItem.name,
        },
      }));
    } catch (err) {
      return [];
    }
  }

  static async getNewsItemsCount() {
    try {
      const response = await axios.get(`/news-items/count`);

      return response.data;
    } catch (err) {
      return 0;
    }
  }

  static async getFoodPresetTypeBySlug(slug) {
    try {
      const response = await axios.get(`/food-preset-types?slug=${slug}`);

      if (response.data && response.data.length === 0) {
        return null;
      }

      return response.data[0];
    } catch (err) {
      return null;
    }
  }
}
