import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Tooltip, Button } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function ExportCSV({ csvData, fileName, styles }) {
  const [formatedData, setFormatedData] = useState(null);

  useEffect(() => {
    const newData =
      csvData &&
      csvData.map((room) => {
        const obj = {
          id: room["id"],
          category: room["category"]["category_name"],
          max_occupancy: room["max_occupancy"],
          occupancy: room["occupancy"],
        };

        return obj;
      });

    setFormatedData(newData);
  }, [csvData]);

  const exportData = () => {
    const filename = `${fileName}.xlsx`;

    const ws = XLSX.utils.json_to_sheet(formatedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rooms");
    XLSX.writeFile(wb, filename);
  };

  return (
    <Tooltip title="Descargar archivo">
      <Button onClick={exportData}>
        <FileDownloadOutlinedIcon
          fontSize="large"
          className={styles.iconDownload}
        />
      </Button>
    </Tooltip>
  );
}
