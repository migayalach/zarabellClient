import { api } from "@/app/shared/api/axios";
import { ICategory, IFilterCategory } from "../types";

export const getAllCategories = async (page?: number) => {
  const response = await api.post("", {
    query: `
      query($page: Int) {
        getAllCategories(page: $page) {
          info {
            count
            pages
            next
            prev
          }
          results {
            idCategory
            nameCategory
            stateCategory
          }
        }
      }
    `,
    variables: {
      page,
    },
  });

  return response.data.data.getAllCategories;
};

export const getOneCategoryByID = async (idCategory: number) => {
  const response = await api.post("", {
    query: `
      query($idCategory: Int!) {
        findOneCategory(idCategory: $idCategory) {
          message
          value {
            idCategory
            nameCategory
            stateCategory
          }
        }
      }
    `,
    variables: {
      idCategory,
    },
  });

  return response.data.data.findOneCategory;
};

export const deleteOneCategory = async (idCategory: number) => {
  const response = await api.post("", {
    query: `
      mutation($idCategory: Int!) {
        deleteCategory(idCategory: $idCategory) {
          message
          value {
            idCategory
            nameCategory
            stateCategory
          }
        }
      }
    `,
    variables: {
      idCategory,
    },
  });

  return response.data.data.deleteCategory;
};

export const createNewCategory = async (nameCategory: string) => {
  const response = await api.post("", {
    query: `
      mutation($nameCategory: String!) {
        createCategory(dataCategory: { nameCategory: $nameCategory }) {
          message
          value {
            idCategory
            nameCategory
            stateCategory
          }
        }
      }
    `,
    variables: {
      nameCategory,
    },
  });

  return response.data.data.createCategory;
};

export const updateOneCategory = async (infoCategory: ICategory) => {
  const response = await api.post("", {
    query: `
      mutation($idCategory: Int!, $nameCategory: String!, $stateCategory: Boolean) {
        updateCategory(dataCategory: {
          idCategory: $idCategory
          nameCategory: $nameCategory
          stateCategory: $stateCategory
        }) {
          message
          value {
            idCategory
            nameCategory
            stateCategory
          }
        }
      }
    `,
    variables: {
      idCategory: infoCategory.idCategory,
      nameCategory: infoCategory.nameCategory,
      stateCategory: infoCategory.stateCategory,
    },
  });

  return response.data.data.updateCategory;
};

export const filterCategories = async (
  filterCategory?: IFilterCategory,
  page?: number,
) => {
  const response = await api.post("", {
    query: `
      query filterCategories(
        $page: Int
        $nameCategory: String
        $stateCategory: Boolean
        $order: Order
      ) {
        filterCategories(
          page: $page
          filters: {
            nameCategory: $nameCategory
            stateCategory: $stateCategory
            order: $order
          }
        ) {
          info {
            pages
            count
            next
            prev
          }
          results {
            idCategory
            nameCategory
            stateCategory
          }
        }
      }
    `,
    variables: {
      page,
      nameCategory: filterCategory?.nameCategory,
      stateCategory: filterCategory?.stateCategory,
      order: filterCategory?.order,
    },
  });

  return response.data.data.filterCategories;
};
