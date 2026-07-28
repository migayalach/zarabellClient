import { api } from "@/app/shared/api/axios";
import { IProductCreate, IProductUpdate } from "../types";

export const getAllProducts = async (page?: number) => {
  const response = await api.post("", {
    query: `
      query($page: Int) {
        getAllProducts(page: $page) {
          info {
            count
            pages
            next
            prev
          }
          results {
            idProduct
            idCategory
            nameProduct
            nameCategory
            stateProduct
          }
        }
      }
    `,
    variables: {
      page,
    },
  });

  return response.data.data.getAllProducts;
};

export const getOneProductByID = async (idProduct: number) => {
  const response = await api.post("", {
    query: `
      query($idProduct: Int!) {
        findOneProduct(idProduct: $idProduct) {
          message
          value {
            idProduct
            idCategory
            nameProduct
            nameCategory
            stateProduct
          }
        }
      }
    `,
    variables: {
      idProduct,
    },
  });

  return response.data.data.findOneProduct;
};

export const createNewProduct = async (infoProduct: IProductCreate) => {
  const response = await api.post("", {
    query: `
      mutation($idCategory: Int!, $nameProduct: String!) {
        createProduct(
          dataProduct: {
            idCategory: $idCategory
            nameProduct: $nameProduct
          }
        ) {
          message
          value {
            idProduct
            idCategory
            nameProduct
            nameCategory
            stateProduct
          }
        }
      }
    `,
    variables: {
      idCategory: infoProduct.idCategory,
      nameProduct: infoProduct.nameProduct,
    },
  });

  return response.data.data.createProduct;
};

export const updateOneProduct = async (infoProduct: IProductUpdate) => {
  const response = await api.post("", {
    query: `
      mutation(
        $idProduct: Int!,
        $idCategory: Int!,
        $nameProduct: String!,
        $stateProduct: Boolean
      ) {
        updateProduct(
          dataProduct: {
            idProduct: $idProduct
            idCategory: $idCategory
            nameProduct: $nameProduct
            stateProduct: $stateProduct
          }
        ) {
          message
          value {
            idProduct
            idCategory
            nameProduct
            nameCategory
            stateProduct
          }
        }
      }
    `,
    variables: {
      idProduct: infoProduct.idProduct,
      idCategory: infoProduct.idCategory,
      nameProduct: infoProduct.nameProduct,
      stateProduct: infoProduct.stateProduct,
    },
  });

  return response.data.data.updateProduct;
};

export const deleteOneProduct = async (idProduct: number) => {
  const response = await api.post("", {
    query: `
      mutation($idProduct: Int!) {
        deleteProduct(idProduct: $idProduct) {
          message
          value {
            idProduct
            idCategory
            nameProduct
            nameCategory
            stateProduct
          }
        }
      }
    `,
    variables: {
      idProduct,
    },
  });

  return response.data.data.deleteProduct;
};
