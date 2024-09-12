import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { ProxySettingModel } from 'app/modules/setting/models/Account'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input
} from "reactstrap"



type Props = {
    item: ProxySettingModel
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const EditProxyModal: React.FC<Props> = ({ item }) => {
    console.log("------item------", item)
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const [max_follower, setMax_follower] = useState(item.max_follower)
    const [max_like, setMax_like] = useState(item.max_like)
    const [max_day_activity, setMax_day_activity] = useState(item.max_day_activity)
    const [max_activity_24h, setMax_activity_24h] = useState(item.max_activity_24h)
    const dismissModal = () => {
        dispatch(actions.clearCurrentProxySetting())
    }
    const updateUser = () => {

        dispatch(actions.requestUpdateProxySetting({
            ...item,
            max_follower,
            max_like,
            max_day_activity,
            max_activity_24h
        }))
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight:'bold',fontFamily:'monospace'}}  className="modal-title">Update Option {item.platform}</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <p style={{fontWeight:'bold'}}>Max Sub/Follow</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={max_follower} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setMax_follower(parseInt(e.target.value))}
                        />
                    </div>
                    <p style={{fontWeight:'bold'}}>Max Like</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={max_like} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setMax_like(parseInt(e.target.value))}
                        />
                    </div>
                    <p style={{fontWeight:'bold'}}>Max Activity</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={max_activity_24h} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setMax_activity_24h(parseInt(e.target.value))}
                        />
                    </div>
                    <p style={{fontWeight:'bold'}}>Max Day Activity</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={max_day_activity} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setMax_day_activity(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">day</span>
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

export default EditProxyModal