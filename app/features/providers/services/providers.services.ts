import { api } from "@/app/shared/api/axios";
import { IProviderCreate, IProviderUpdate } from "../types";

export const getAllProviders = async (page?: number) => {
  const response = await api.post("", {
    query: `
     query($page: Int){
        getAllProviders(page: $page){
          info{
            count
            pages
            next
            prev
          }
          results{
            idProvider
            nameProvider
            emailProvider
            phoneProvider
            stateProvider
          }
        }
      }
    `,
    variables: {
      page,
    },
  });
  return response.data.data.getAllProviders;
};

export const getOneProviderByID = async (idProvider: number) => {
  const response = await api.post("", {
    query: `
     query($idProvider: Int!){
        findOneProvider(idProvider: $idProvider){
          message
          value{
            idProvider
            nameProvider
            emailProvider
            phoneProvider
            stateProvider
          }
        }
      }
    `,
    variables: {
      idProvider,
    },
  });
  return response.data.data.findOneProvider;
};

export const createNewProvider = async (infoProvider: IProviderCreate) => {
  const response = await api.post("", {
    query: `
      mutation($nameProvider: String!, $emailProvider: String!, $phoneProvider: String!){
        createProvider(dataProvider:{
          nameProvider: $nameProvider, 
          emailProvider: $emailProvider, 
          phoneProvider: $phoneProvider
          }){
          message
          value{
            idProvider
            nameProvider
            emailProvider
            phoneProvider
            stateProvider
          }
        }
      }
    `,
    variables: {
      nameProvider: infoProvider.nameProvider,
      emailProvider: infoProvider.emailProvider,
      phoneProvider: infoProvider.phoneProvider,
    },
  });

  return response.data.data.createProvider;
};

export const updateOneProvider = async (infoProvider: IProviderUpdate) => {
  const response = await api.post("", {
    query: `
      mutation($idProvider: Int!, $nameProvider: String!, $emailProvider: String!, $phoneProvider: String!, $stateProvider: Boolean!){
        updateProvider(dataProvider:{
          idProvider: $idProvider
          nameProvider: $nameProvider, 
          emailProvider: $emailProvider, 
          phoneProvider: $phoneProvider,
          stateProvider: $stateProvider
          }){
          message
          value{
            idProvider
            nameProvider
            emailProvider
            phoneProvider
            stateProvider
          }
        }
      }
    `,
    variables: {
      idProvider: infoProvider.idProvider,
      nameProvider: infoProvider.nameProvider,
      emailProvider: infoProvider.emailProvider,
      phoneProvider: infoProvider.phoneProvider,
      stateProvider: infoProvider.stateProvider,
    },
  });

  return response.data.data.updateProvider;
};

export const deleteOneProvider = async (idProvider: number) => {
  const response = await api.post("", {
    query: `
     mutation($idProvider: Int!){
      deleteProvider(idProvider: $idProvider){
        message
        value {
          idProvider
          nameProvider
          emailProvider
          phoneProvider
          stateProvider
        }
      }
    }
    `,
    variables: {
      idProvider,
    },
  });

  return response.data.data.deleteProvider;
};
