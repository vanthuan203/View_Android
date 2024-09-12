import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { PlatformModel } from 'app/modules/setting/models/Account'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input
} from "reactstrap"



type Props = {
    item: PlatformModel
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const EditPlatformModal: React.FC<Props> = ({ item }) => {
    console.log("------item------", item)
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const [priority, setPriority] = useState(item.priority)
    const [activity, setActivity] = useState(item.activity)
    const [state, setState] = useState(item.state)

    const dismissModal = () => {
        dispatch(actions.clearCurrentPlatformLimit())
    }
    const updateUser = () => {
        dispatch(actions.requestUpdatePlatformLimit({
            ...item,
            priority,
            activity,
            state
        }))
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight:'bold',fontFamily:'monospace'}}  className="modal-title">Update {item.platform.toUpperCase()}</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <p style={{fontWeight:'bold'}}>Priority</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={priority} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setPriority(parseInt(e.target.value))}
                        />
                    </div>
                    <p style={{fontWeight:'bold'}}>State</p>
                    <div className="input-group mb-5">
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => setState(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={state}
                        >
                            <option key={"1"} value={1}>
                                ON
                            </option>
                            <option key={"0"} value={0}>
                                OFF
                            </option>
                        </Input>
                    </div>
                    <p style={{fontWeight:'bold'}}>Activity</p>
                    <div className="input-group mb-5">
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => setActivity(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={activity}
                        >
                            <option key={"1"} value={1}>
                                ON
                            </option>
                            <option key={"0"} value={0}>
                                OFF
                            </option>
                        </Input>
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

export default EditPlatformModal