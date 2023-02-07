import React from "react";
import "devextreme/data/odata/store";
import DataGrid, { Column, MasterDetail } from "devextreme-react/data-grid";
import { flightList } from "../../api/fligth";
import { Flight } from "../../interfaces/flight";

export default function Flights() {
  // const formattedFlights = useMemo(() => {
  //   return flightList.map((f) => {
  //     const { airlineCode, filghtDate, flightCode, destination, origin } = f;
  //     const airlineAndFlightCodes = `${airlineCode} #${flightCode}`;
  //     const date = new Date(filghtDate);
  //     const route = `${origin} / ${destination}`;
  //     return { flightCode, airlineAndFlightCodes, date, route };
  //   });
  // }, [flightList.length]);

  function formatRoute(flight: Flight) {
    return `${flight.origin} / ${flight.destination}`;
  }

  function formatDate(flight: Flight) {
    return new Intl.DateTimeFormat("en-RU", { dateStyle: "medium" }).format(
      new Date(flight.filghtDate)
    );
  }
  function formatCodes(flight: Flight): string {
    return `${flight.airlineCode} #${flight.flightCode}`;
  }

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Flights</h2>
      <DataGrid
        dataSource={flightList}
        keyExpr="flightCode"
        showBorders
        showColumnLines
        showRowLines
        rowAlternationEnabled>
        <Column
          dataField="flightCode"
          caption="codes"
          calculateCellValue={formatCodes}
        />
        <Column
          dataField="date"
          dataType="date"
          calculateCellValue={formatDate}
        />
        <Column
          dataField="origin"
          caption="origin and destination"
          calculateCellValue={formatRoute}
        />
        <MasterDetail enabled={true} component={DetailContingents} />
      </DataGrid>
    </React.Fragment>
  );
}

type DetailsContingentsProps = {
  data: {
    data: Flight;
  };
};

function DetailContingents(props: DetailsContingentsProps) {
  const {
    data: {
      data: { contingents },
    },
  } = props;

  return (
    <>
      <div className="master-detail-caption">Details</div>
      <DataGrid
        dataSource={contingents}
        showBorders={true}
        columnAutoWidth={true}>
        <Column dataField="clientCode" />
        <Column dataField="blockedSeats" dataType="number" />
        <Column dataField="totalSeats" dataType="number" />
      </DataGrid>
    </>
  );
}
