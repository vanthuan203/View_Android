import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel } from 'app/modules/setting/models/Account'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input
} from "reactstrap"



type Props = {
    item: AccountModel
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const EditModal: React.FC<Props> = ({ item }) => {
    console.log("------item------", item)
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const [max_acc, setMax_acc] = useState(item.max_acc)
    const [max_mysql, setMax_mysql] = useState(item.max_mysql)
    const [max_profile, setMax_profile] = useState(item.max_profile)
    const [max_task, setMax_task] = useState(item.max_task)

    const dismissModal = () => {
        dispatch(actions.clearCurrentAccount())
    }
    const updateUser = () => {
        dispatch(actions.requestUpdate({
            ...item,
            max_acc,
            max_mysql,
            max_profile,
            max_task
        }))
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight:'bold',fontFamily:'monospace'}}  className="modal-title">Update Setting</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <p style={{fontWeight:'bold'}}>Max Account</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={max_acc} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setMax_acc(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">account</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Max MySQL</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={max_mysql} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setMax_mysql(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">process</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Max Profile</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={max_profile} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setMax_profile(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">profile</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Max Task</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={max_task} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setMax_task(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">task</span>
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