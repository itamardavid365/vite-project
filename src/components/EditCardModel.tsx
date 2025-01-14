import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import EditCard from "./EditCard";
import { GetCard } from "../interfaces/Card";

interface AddProductModelProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    card: GetCard | undefined
}

const AddProductModel: FunctionComponent<AddProductModelProps> = ({ show, onHide, refresh, card }) => {
    return (<>
        <Modal
            show={show}
            onHide={() => onHide()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit card
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditCard onHide={onHide} card={card} refresh={refresh} />
            </Modal.Body>

        </Modal>
    </>);
}

export default AddProductModel;