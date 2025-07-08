import customAxios from "@/utils/customInterceptors"
export const fetchLegueTable = async (season: number) => {
    const response = await customAxios.get(`/league-table/${season}`)
    return response.data;
}