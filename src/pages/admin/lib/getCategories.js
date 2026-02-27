export const getCategoriesData = (data) => {
    if (data && Array.isArray(data)) {

      return data.map((item) => {
        return {
          id: item.id,
          title: item.meta.title,
        };
      });
    } else {
      return []
    }

  }