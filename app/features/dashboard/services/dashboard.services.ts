import { api } from "@/app/shared/api/axios";

export const getInfoDashboard = async () => {
  const response = await api.post("", {
    query: `
      query{
        getDashboardInfo{
          message
          success
          results {
            bestSellers {
              nameProvider
              nameProduct        
              totalSold
            }
            lessSellers {
              nameProvider
              nameProduct        
              totalSold
            }
            nearExpiration {
              nameProvider
              nameProduct        
              days
            }
            todaySales {
              productsSoldToday
              totalWinToday
            }
            yesterdaySales {
              productsSoldYesterday
              totalWinYesterday
            }
            totalProducts
            totalOutputsCurrentMonth
            totalLotsToExpiration
          }
        }
      }
    `,
  });
  return response.data.data.getDashboardInfo;
};
