import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import RequestInformationTable from "../tables/RequestInformationTable";
import {Button} from "@mui/material";


export default function RequestInformationDialog(props) {
    const { onClose, open, information } = props;


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Detalles</DialogTitle>
            <RequestInformationTable jsonData={information} />
            <Button onClick={onClose}>cerrar</Button>
        </Dialog>
    )
}