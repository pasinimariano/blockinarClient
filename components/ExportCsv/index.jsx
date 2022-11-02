import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button, Tooltip } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function ExportCSV({ csvData, fileName, styles }) {
  const dataToExport =
    csvData &&
    csvData.map((room) => {
      const newObj = {
        id: room["id"],
        category: room["category"]["category_name"],
        max_occupancy: room["max_occupancy"],
        occupancy: room["occupancy"],
      };

      return newObj;
    });

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlxs";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Tooltip title="Descargar archivo">
      <Button onClick={() => exportToCSV(dataToExport, fileName)}>
        <FileDownloadOutlinedIcon
          fontSize="large"
          className={styles.iconDownload}
        />
      </Button>
    </Tooltip>
  );
}
