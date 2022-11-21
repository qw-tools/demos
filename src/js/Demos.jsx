import React from "react";
import { AgGridReact } from "ag-grid-react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const fetchGet = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${url}`);
  }
  return response.json();
};

export const DemosPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Demos />
    </QueryClientProvider>
  );
};

const defaultColDef = {
  filter: true,
  floatingFilter: true,
  suppressMenu: true,
  sortable: true,
};

const columnDefs = [
  {
    field: "time",
    flex: 1,
    minWidth: 180,
    maxWidth: 180,
    initialSort: "desc",
    valueGetter: (params) => {
      return params.data.time
        .substring(0, "yyyy-mm-dd hh:ii".length)
        .replace("T", " ");
    },
  },
  {
    field: "qtv_address",
    headerName: "QTV",
    flex: 1,
    minWidth: 120,
    maxWidth: 180,
    cellRenderer: (params) => {
      return (
        <a href={`http://${params.value}/demos/`}>
          {params.value.replace(":28000", "")}
        </a>
      );
    },
  },
  {
    field: "filename",
    flex: 1,
    minWidth: 280,
    maxWidth: 480,
    cellRenderer: (params) => {
      return (
        <>
          <a
            href={`${params.data.download_url}`}
            title={params.data.download_url}
          >
            {params.value}
          </a>{" "}
          <span style={{ marginLeft: 10 }}>
            (
            <a
              href={`qw://file:${params.data.filename}@${params.data.qtv_address}/qtvplay`}
              title="Stream demo from QTV using ezQuake"
            >
              stream
            </a>
            )
          </span>
        </>
      );
    },
  },
  { field: "mode", flex: 1, minWidth: 120, maxWidth: 120 },
  {
    field: "participants",
    headerName: "Players / Teams",
    flex: 1,
    minWidth: 280,
    maxWidth: 280,
  },
  { field: "map", flex: 1, minWidth: 80, maxWidth: 180 },
];

const gridOptions = {
  enableCellTextSelection: true,
  ensureDomOrder: true,
};

const applyQueryParams = (event) => {
  if (0 === window.location.search.length) {
    return;
  }

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const filters = ["qtv_address", "filename", "mode", "participants", "map"];
  let hasChangedFilters = false;

  filters.forEach((key) => {
    if (params[key]) {
      const filterInstance = event.api.getFilterInstance(key);
      filterInstance.setModel({
        type: "text",
        filter: params[key],
      });
      hasChangedFilters = true;
    }
  });

  if (hasChangedFilters) {
    event.api.onFilterChanged();
  }
};

export const Demos = () => {
  const query = useQuery(["demos"], () =>
    fetchGet("https://hubapi.quakeworld.nu/v2/demos")
  );

  if (!query.data) {
    return <div className="app-loading">loading demos..</div>;
  }

  const modifiedData = query.data.map((d) => {
    return { ...d, ...parseDetails(d.filename) };
  });

  return (
    <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        gridOptions={gridOptions}
        rowData={modifiedData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowHeight={36}
        onFirstDataRendered={applyQueryParams}
      ></AgGridReact>
    </div>
  );
};

const parseDetails = (filename) => {
  // duel_rasta_vs_igggy[aerowalk]311022-2051.mvd

  const mode = filename.substring(0, filename.indexOf("_"));
  const participants = filename
    .substring(1 + mode.length, filename.lastIndexOf("["))
    .replaceAll("_", " ");
  const map = filename.substring(
    2 + participants.length + mode.length,
    filename.lastIndexOf("]")
  );

  return {
    mode,
    participants,
    map,
  };
};
