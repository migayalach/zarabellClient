import { api } from "@/app/shared/api/axios";
import { IBranchCreate, IBranchUpdate, IFilterBranch } from "../types";

export const getAllBranchs = async (page?: number) => {
  const response = await api.post("", {
    query: `
      query($page: Int){
        findAllBranchs(page: $page){
          info {
            count
            pages
            next
            prev
          }
          results {
            idBranch
            nameBranch
            address
            phone
            stateBranch
          }
        }
      }
    `,
    variables: {
      page,
    },
  });

  return response.data.data.findAllBranchs;
};

export const getOneBranchByID = async (idBranch: number) => {
  const response = await api.post("", {
    query: `
      query($idBranch: Int!) {
        findOneBranch(idBranch: $idBranch) {
          success
          message
          value {
            idBranch
            nameBranch
            address
            phone
            stateBranch
          }
        }
      }
    `,
    variables: {
      idBranch,
    },
  });

  return response.data.data.findOneBranch;
};

export const createNewBranch = async (dataBranch: IBranchCreate) => {
  const response = await api.post("", {
    query: `
      mutation($nameBranch: String!, $address: String!, $phone: String!) {
        addBranch(dataBranch: {
          nameBranch : $nameBranch
          address: $address
          phone : $phone
        }){
          success
          message
          value {
            idBranch
            nameBranch
            address
            phone
            stateBranch
          }
        }
      }
    `,
    variables: {
      nameBranch: dataBranch.nameBranch,
      address: dataBranch.address,
      phone: dataBranch.phone,
    },
  });

  return response.data.data.addBranch;
};

export const updateOneRole = async (dataBranch: IBranchUpdate) => {
  const response = await api.post("", {
    query: `
      mutation(
        $idBranch: Int!
        $nameBranch: String!
        $address: String
        $phone: String
        $stateBranch: Boolean!
      ) {
        updateBranch(
          dataBranch: {
            idBranch: $idBranch
            nameBranch: $nameBranch
            address: $address
            phone: $phone
            stateBranch: $stateBranch
          }
        ) {
          success
          message
          value {
            idBranch
            nameBranch
            address
            phone
            stateBranch
          }
        }
      }
    `,
    variables: {
      idBranch: dataBranch.idBranch,
      nameBranch: dataBranch.nameBranch,
      address: dataBranch.address,
      phone: dataBranch.phone,
      stateBranch: dataBranch.stateBranch,
    },
  });

  return response.data.data.updateBranch;
};

export const deleteOneRole = async (idBranch: number) => {
  const response = await api.post("", {
    query: `
      mutation($idBranch: Int!) {
        removeBranch(idBranch: $idBranch){
          success
          message
          value {
            idBranch
            nameBranch
            address
            phone
            stateBranch
          }
        }
      }
    `,
    variables: {
      idBranch,
    },
  });

  return response.data.data.removeBranch;
};

export const filterBranchs = async (
  filterBranchs?: IFilterBranch,
  page?: number,
) => {
  const response = await api.post("", {
    query: `
      query FilterBranchs(
        $page: Int
        $nameBranch: String
        $stateBranch: Boolean
        $order: Order
      ) {
        filterBranchs(
          page: $page
          filters: {
            nameBranch: $nameBranch
            stateBranch: $stateBranch
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
            idBranch
            nameBranch
            address
            phone
            stateBranch
          }
        }
      }
    `,
    variables: {
      page,
      nameBranch: filterBranchs?.nameBranch,
      stateBranch: filterBranchs?.stateBranch,
      order: filterBranchs?.order,
    },
  });

  return response.data.data.filterBranchs;
};
