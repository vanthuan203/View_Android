import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { OrderModel } from 'app/modules/devices/models/Order'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input
} from "reactstrap"


type Props = {
    item: OrderModel
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const EditModal: React.FC<Props> = ({ item }) => {
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    let [state, setState] = useState(item.state)
    let [device_id, setDevice_Id] = useState(item.device_id)
    const [box_id, setBox_id] = useState(item.box_id)
    const [mode, setMode] = useState(item.mode)
    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }
    const updateUser = () => {
        dispatch(actions.requestUpdateBox({
            ...item,
            device_id,
           state,
            box_id,
            mode
        }))
        dispatch(actions.clearcurrentOrder())
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight:'bold',fontFamily:'monospace'}}  className="modal-title">Update:  {item?.device_id}</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">State</span>
                        <Input
                            onChange={(e) => setState(parseInt(e.target.value))}
                            className="form-control form-control-solid"
                            type="select"
                            style={{fontWeight:'bold'}}
                            value={state}
                        >
                            <option key={"1"} value={"1"}>
                                {"ON"}
                            </option>
                            <option key={"0"} value={"0"}>
                                {"OFF"}
                            </option>


                        </Input>
                    </div>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">Box Id</span>
                        <input style={{fontWeight:'bold'}} value={box_id} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setBox_id(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon2">Mode</span>
                        <input style={{fontWeight:'bold'}} value={mode} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setMode(e.target.value)}
                        />
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" onClick={dismissModal} className="btn btn-light" >Thoát</button>
                    <button type="button" onClick={updateUser} style={{backgroundColor:"#26695c",color:"white"}} className="btn ">Lưu</button>
                </div>
            </div>

        </Modal>
    )
}

export default EditModal