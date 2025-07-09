import customAxios from "@/utils/customInterceptors"

export const getSeasonWiseGoalStat = async () => {
    const response = await customAxios("/get-season-wise-goals");

    return response.data;
}