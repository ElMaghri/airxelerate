import { Contingent, IATA } from "./contingent";

export interface Flight {
    airlineCode: IATA;
    flightCode:number;
    filghtDate:Date;
    origin: IATA;
    destination: IATA;
    contingents:Contingent[]
};
