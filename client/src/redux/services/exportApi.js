import api from "./axiosInstance";

const buildQueryString = (params = {}) => {
  const searchParam = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParam.append(key, String(value));
    }
  });

  return searchParam;
};

/**
 * Fetches export data as JSON — used to build the PDF client-side.
 * Accepts the same filters as getExpenseApi: search, category, startDate, endDate.
 */
export const getExportDataApi = async (params = {}) => {
  const searchParam = buildQueryString(params);
  const queryString = searchParam.toString();

  const url = queryString
    ? `/expenses/expenses/export?${queryString}`
    : `/expenses/expenses/export`;

  const response = await api.get(url);
  return response.data;
};

/**
 * Requests the CSV export and triggers a browser download.
 * The filename is generated client-side rather than read from the
 * Content-Disposition response header, since that header isn't exposed
 * to client JS by default under CORS (would require the server to send
 * Access-Control-Expose-Headers explicitly) — generating it here avoids
 * that dependency entirely.
 */
export const downloadCsvExportApi = async (params = {}) => {
  const searchParam = buildQueryString(params);
  searchParam.set("format", "csv");

  const url = `/expenses/expenses/export?${searchParam.toString()}`;

  const response = await api.get(url, { responseType: "blob" });

  const filename = `expenses-export-${new Date().toISOString().split("T")[0]}.csv`;

  const blob = new Blob([response.data], { type: "text/csv" });
  const downloadUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
};
